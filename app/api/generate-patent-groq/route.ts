import type { NextRequest } from "next/server"
import { fetchWithRetry, delay } from "./utils"

const GROQ_API_KEY = process.env.GROQ_API_KEY 

export async function POST(request: NextRequest) {
  try {
    const { inventionData, selectedOffice, format = "text" } = await request.json()

    // Log API key status (safely)
    console.log("Groq API Key available:", GROQ_API_KEY ? "Yes" : "No")
    console.log("Groq API Key length:", GROQ_API_KEY ? GROQ_API_KEY.length : 0)

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const sections = [
            "Title",
            "Abstract",
            "Technical Field",
            "Background",
            "Summary",
            "Claims",
            "Detailed Description",
          ]

          for (const section of sections) {
            // Send section start event
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "section_start", section })}\n\n`))

            // Generate content for this section
            const sectionPrompt = createSectionPrompt(section, inventionData, selectedOffice, format)

            console.log(`Generating section: ${section} with Groq`)
            
            // Groq has higher rate limits, so shorter delays
            if (sections.indexOf(section) > 0) {
              console.log('Waiting before generating next section...');
              await delay(500); // 0.5 second delay between sections for Groq
            }

            // Create the request payload
            const requestPayload = {
              model: "llama-3.1-8b-instant", // Updated to correct model name
              messages: [
                {
                  role: "system",
                  content: "You are an expert patent attorney and technical writer. Generate high-quality patent content that meets professional standards."
                },
                {
                  role: "user",
                  content: sectionPrompt
                }
              ],
              temperature: 0.7,
              max_tokens: 1024,
              top_p: 1,
              stream: false
            };

            console.log('Groq request payload:', JSON.stringify(requestPayload, null, 2));

            const response = await fetchWithRetry(
              "https://api.groq.com/openai/v1/chat/completions",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${GROQ_API_KEY}`,
                },
                body: JSON.stringify(requestPayload),
              },
              2, // max retries
              1000 // initial delay of 1 second
            )

            if ('error' in response) {
              // If API limit is reached, send a message and continue with next section
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ 
                    type: "content", 
                    section, 
                    content: `⚠️ Rate limit reached for ${section} with Groq API. Please try again in a moment.` 
                  })}\n\n`
                )
              )
              continue
            }

            if (!response.ok) {
              throw new Error(`Groq API error: ${response.status}`)
            }

            const result = await response.json()
            const content = result.choices?.[0]?.message?.content || ""

            // Stream content in chunks to simulate real-time generation
            const words = content.split(" ")
            for (let i = 0; i < words.length; i += 3) {
              const chunk = words.slice(i, i + 3).join(" ") + " "
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: "content", section, content: chunk })}\n\n`),
              )
              // Small delay to simulate streaming
              await new Promise((resolve) => setTimeout(resolve, 30))
            }

            // Send section complete event
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "section_complete", section })}\n\n`))

            // Shorter delay between sections for Groq
            await new Promise((resolve) => setTimeout(resolve, 200))
          }

          // Send completion event
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "complete" })}\n\n`))

          controller.close()
        } catch (error) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", message: error instanceof Error ? error.message : "Unknown error" })}\n\n`,
            ),
          )
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

function createSectionPrompt(section: string, inventionData: any, selectedOffice: any, format = "text"): string {
  const baseInfo =
    typeof inventionData === "object" && inventionData !== null
      ? `Title: ${inventionData.title || "Not provided"}
       Problem: ${inventionData.problem || "Not provided"}
       Solution: ${inventionData.solution || "Not provided"}
       Technical Description: ${inventionData.technicalDescription || "Not provided"}
       Advantages: ${inventionData.advantages || "Not provided"}
       Inventors: ${inventionData.inventors || "Not provided"}`
      : "Invention data provided as file upload"

  const formatInstruction =
    format === "markdown"
      ? "Format the response in clean markdown with appropriate headers, bullet points, and formatting. Use proper markdown syntax including **bold**, *italic*, and numbered lists where appropriate."
      : ""

  const prompts = {
    Title: `Create a clear, concise patent title for this invention. The title should be descriptive but not overly long( under 30 words). ${formatInstruction} Based on: ${baseInfo}`,

    Abstract: `Write a patent abstract (150-250 words) that summarizes the invention, its technical field, the problem it solves, and the solution. Format for ${selectedOffice.name}. ${formatInstruction} Based on: ${baseInfo}`,

    "Technical Field": `Write the technical field section describing the area of technology this invention relates to. ${formatInstruction} Based on: ${baseInfo}`,

    Background: `Write the background section explaining the current state of technology and problems that exist. ${formatInstruction} Based on: ${baseInfo}`,

    Summary: `Write a summary of the invention section that clearly explains what the invention is and how it works. ${formatInstruction} Based on: ${baseInfo}`,

    Claims: `Write patent claims (at least 3 independent and dependent claims) that define the scope of protection. Format according to ${selectedOffice.name} standards. ${formatInstruction} Use numbered lists for claims. Based on: ${baseInfo}`,

    "Detailed Description": `Write a detailed description of the invention including how it works, its components, and implementation details. ${formatInstruction} Based on: ${baseInfo}. Include sections and subsections`,





  }

  return prompts[section as keyof typeof prompts] || `Generate content for ${section} section based on: ${baseInfo}`
}

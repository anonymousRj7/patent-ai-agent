import { type NextRequest, NextResponse } from "next/server"

interface InventionData {
  title: string
  problem: string
  solution: string
  technicalDescription: string
  advantages: string
  drawingsDescription: string
  priorArt: string
  inventors: string
  assignee: string
}

interface PatentOffice {
  id: string
  name: string
  fullName: string
  coverage: string
}

export async function POST(request: NextRequest) {
  try {
    const { inventionData, selectedOffice, isFile } = await request.json()

    // Gemini API configuration
    const GEMINI_API_KEY = "AIzaSyDksm6Dsg6-irn8fuII3wVyhuwRX8Z9r_g"
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`

    let prompt = ""

    if (isFile) {
      // Handle PDF file case - for now, we'll use a generic prompt
      prompt = `Generate a complete patent application for the invention described in the uploaded document. The patent should be filed with ${selectedOffice.fullName} (${selectedOffice.name}).

Please create a comprehensive patent document with the following sections:
1. Title
2. Abstract (150-250 words)
3. Background of the Invention
4. Summary of the Invention
5. Brief Description of the Drawings (if applicable)
6. Detailed Description
7. Claims (at least 3 independent and dependent claims)

Format the output as a professional patent application suitable for ${selectedOffice.coverage}.`
    } else {
      // Handle manual form data
      const data = inventionData as InventionData
      prompt = `Generate a complete patent application based on the following invention details for filing with ${selectedOffice.fullName} (${selectedOffice.name}):

**Invention Title:** ${data.title}
**Problem Statement:** ${data.problem}
**Solution:** ${data.solution}
**Technical Description:** ${data.technicalDescription}
**Advantages:** ${data.advantages || "Not specified"}
**Drawings Description:** ${data.drawingsDescription || "Not specified"}
**Prior Art:** ${data.priorArt || "Not specified"}
**Inventors:** ${data.inventors || "Not specified"}
**Assignee:** ${data.assignee || "Not specified"}

Please create a comprehensive patent document with the following sections:
1. Title
2. Abstract (150-250 words)
3. Background of the Invention
4. Summary of the Invention
5. Brief Description of the Drawings (if applicable)
6. Detailed Description
7. Claims (at least 3 independent and dependent claims)

Ensure the patent application follows the formatting and requirements for ${selectedOffice.coverage}. Make the claims specific and technically detailed based on the provided information.`
    }

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
    }

    console.log("[v0] Sending request to Gemini API...")

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      console.log("[v0] Gemini API error:", response.status, response.statusText)
      const errorText = await response.text()
      console.log("[v0] Error details:", errorText)
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log("[v0] Gemini API response received successfully")

    if (!result.candidates || !result.candidates[0] || !result.candidates[0].content) {
      console.log("[v0] Invalid response structure:", result)
      throw new Error("Invalid response from Gemini API")
    }

    const generatedPatent = result.candidates[0].content.parts[0].text

    return NextResponse.json({
      success: true,
      patent: generatedPatent,
      office: selectedOffice,
    })
  } catch (error) {
    console.error("[v0] Patent generation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate patent",
      },
      { status: 500 },
    )
  }
}

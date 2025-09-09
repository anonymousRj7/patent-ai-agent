"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, Save, Edit3, FileText, ImageIcon, Plus } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

interface PatentSection {
  id: string
  title: string
  content: string
  editable: boolean
}

export default function PatentEditor() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [patentData, setPatentData] = useState<string>("")
  const [sections, setSections] = useState<PatentSection[]>([])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [title, setTitle] = useState("Patent Application")

  useEffect(() => {
    // Get patent data from URL params or localStorage
    const patent = searchParams.get("patent") || localStorage.getItem("generatedPatent")
    const office = searchParams.get("office") || localStorage.getItem("selectedOffice")

    if (patent) {
      setPatentData(patent)
      parsePatentIntoSections(patent)
    }
  }, [searchParams])

  const parsePatentIntoSections = (patent: string) => {
    // Parse the generated patent into editable sections
    const lines = patent.split("\n")
    const parsedSections: PatentSection[] = []
    let currentSection = { id: "", title: "", content: "", editable: true }

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()

      // Detect section headers (lines that are all caps or start with numbers)
      if (trimmedLine.match(/^[A-Z\s\d.]+$/) && trimmedLine.length > 3 && trimmedLine.length < 50) {
        if (currentSection.title) {
          parsedSections.push({ ...currentSection, id: `section-${parsedSections.length}` })
        }
        currentSection = {
          id: `section-${parsedSections.length}`,
          title: trimmedLine,
          content: "",
          editable: true,
        }
      } else if (trimmedLine) {
        currentSection.content += line + "\n"
      }
    })

    if (currentSection.title) {
      parsedSections.push({ ...currentSection, id: `section-${parsedSections.length}` })
    }

    setSections(parsedSections)

    // Extract title from first section if available
    if (parsedSections.length > 0) {
      setTitle(parsedSections[0].title || "Patent Application")
    }
  }

  const updateSection = (sectionId: string, newContent: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, content: newContent } : section)),
    )
  }

  const addNewSection = () => {
    const newSection: PatentSection = {
      id: `section-${sections.length}`,
      title: "NEW SECTION",
      content: "Enter your content here...",
      editable: true,
    }
    setSections((prev) => [...prev, newSection])
  }

  const savePatent = async () => {
    setIsSaving(true)
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("savedPatent", JSON.stringify({ title, sections }))
    setIsSaving(false)
  }

  const downloadAsPDF = () => {
    // Create a formatted text version for download
    const formattedPatent = sections
      .map((section) => `${section.title}\n${"=".repeat(section.title.length)}\n\n${section.content}\n\n`)
      .join("")

    const blob = new Blob([formattedPatent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Patent Editor</h1>
            <p className="text-slate-600">Edit and refine your generated patent application</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={savePatent} disabled={isSaving} className="bg-cyan-600 hover:bg-cyan-700">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={downloadAsPDF}
              variant="outline"
              className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Title Editor */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-600" />
              <CardTitle>Patent Title</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold"
              placeholder="Enter patent title..."
            />
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={section.id} className="border-l-4 border-l-cyan-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-cyan-700 border-cyan-200">
                      Section {index + 1}
                    </Badge>
                    <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(isEditing === section.id ? null : section.id)}
                    className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    {isEditing === section.id ? "Done" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing === section.id ? (
                  <Textarea
                    value={section.content}
                    onChange={(e) => updateSection(section.id, e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                    placeholder="Enter section content..."
                  />
                ) : (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
                      {section.content}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Section Button */}
        <Card className="mt-6 border-dashed border-2 border-cyan-200">
          <CardContent className="flex items-center justify-center py-8">
            <Button
              onClick={addNewSection}
              variant="ghost"
              className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Section
            </Button>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
          <Button variant="outline" onClick={() => router.push("/dashboard")} className="text-slate-600">
            Back to Dashboard
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent">
              <ImageIcon className="w-4 h-4 mr-2" />
              Add Images
            </Button>
            <Button
              onClick={downloadAsPDF}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Patent
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, AlertCircle, CheckCircle, X } from "lucide-react"

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

interface InventionInformationFormProps {
  onSubmit: (data: InventionData | File) => void
  inventionData?: InventionData
}

export default function InventionInformationForm({ onSubmit, inventionData }: InventionInformationFormProps) {
  const [activeTab, setActiveTab] = useState("manual")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [formData, setFormData] = useState<InventionData>(
    inventionData || {
      title: "",
      problem: "",
      solution: "",
      technicalDescription: "",
      advantages: "",
      drawingsDescription: "",
      priorArt: "",
      inventors: "",
      assignee: "",
    },
  )

  const handleInputChange = (field: keyof InventionData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf") {
        setUploadedFile(file)
      } else {
        alert("Please upload a PDF file only.")
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        setUploadedFile(file)
      } else {
        alert("Please upload a PDF file only.")
      }
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const handleSubmit = () => {
    if (activeTab === "manual") {
      // Validate required fields
      if (!formData.title || !formData.problem || !formData.solution || !formData.technicalDescription) {
        alert("Please fill in all required fields (Title, Problem, Solution, and Technical Description).")
        return
      }
      onSubmit(formData)
    } else {
      if (!uploadedFile) {
        alert("Please upload an invention disclosure PDF.")
        return
      }
      onSubmit(uploadedFile)
    }
  }

  const isFormValid = () => {
    if (activeTab === "manual") {
      return formData.title && formData.problem && formData.solution && formData.technicalDescription
    } else {
      return uploadedFile !== null
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Invention Information</h2>
        <p className="text-muted-foreground">
          Provide details about your invention either by filling out the form or uploading a disclosure document
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Manual Entry</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload PDF</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
                <CardDescription>Provide the fundamental details about your invention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Invention Title{" "}
                    <Badge variant="destructive" className="ml-1 text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter a clear, descriptive title for your invention"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inventors">Inventor(s)</Label>
                    <Input
                      id="inventors"
                      placeholder="John Doe, Jane Smith"
                      value={formData.inventors}
                      onChange={(e) => handleInputChange("inventors", e.target.value)}
                      className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assignee (Optional)</Label>
                    <Input
                      id="assignee"
                      placeholder="Company or organization name"
                      value={formData.assignee}
                      onChange={(e) => handleInputChange("assignee", e.target.value)}
                      className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technical Details</CardTitle>
                <CardDescription>Describe the technical aspects of your invention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="problem">
                    Problem Statement{" "}
                    <Badge variant="destructive" className="ml-1 text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Textarea
                    id="problem"
                    placeholder="Describe the problem your invention solves. What existing limitations or challenges does it address?"
                    rows={3}
                    value={formData.problem}
                    onChange={(e) => handleInputChange("problem", e.target.value)}
                    className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution">
                    Solution Overview{" "}
                    <Badge variant="destructive" className="ml-1 text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Textarea
                    id="solution"
                    placeholder="Explain how your invention solves the problem. What is the core innovation?"
                    rows={3}
                    value={formData.solution}
                    onChange={(e) => handleInputChange("solution", e.target.value)}
                    className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technicalDescription">
                    Technical Description{" "}
                    <Badge variant="destructive" className="ml-1 text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Textarea
                    id="technicalDescription"
                    placeholder="Provide detailed technical description including components, processes, methods, and how they work together"
                    rows={4}
                    value={formData.technicalDescription}
                    onChange={(e) => handleInputChange("technicalDescription", e.target.value)}
                    className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="advantages">Advantages & Benefits</Label>
                  <Textarea
                    id="advantages"
                    placeholder="List the key advantages and benefits of your invention over existing solutions"
                    rows={3}
                    value={formData.advantages}
                    onChange={(e) => handleInputChange("advantages", e.target.value)}
                    className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Information</CardTitle>
                <CardDescription>Optional details that can strengthen your patent application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drawingsDescription">Drawings & Diagrams Description</Label>
                  <Textarea
                    id="drawingsDescription"
                    placeholder="Describe any drawings, diagrams, or figures that illustrate your invention"
                    rows={2}
                    value={formData.drawingsDescription}
                    onChange={(e) => handleInputChange("drawingsDescription", e.target.value)}
                    className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priorArt">Known Prior Art</Label>
                  <Textarea
                    id="priorArt"
                    placeholder="Describe any existing solutions or prior art you're aware of and how your invention differs"
                    rows={3}
                    value={formData.priorArt}
                    onChange={(e) => handleInputChange("priorArt", e.target.value)}
                    className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload Invention Disclosure</CardTitle>
              <CardDescription>
                Upload a PDF document containing your invention disclosure or technical description
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : uploadedFile
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                      : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="space-y-4">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-foreground">File Uploaded Successfully</p>
                      <p className="text-sm text-muted-foreground mt-1">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={removeFile} className="bg-transparent">
                      <X className="h-4 w-4 mr-2" />
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-foreground">Drop your PDF here</p>
                      <p className="text-sm text-muted-foreground">or click to browse files</p>
                    </div>
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
                    <Button variant="outline" asChild className="bg-transparent">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose PDF File
                      </label>
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">PDF Requirements</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• File must be in PDF format</li>
                      <li>• Maximum file size: 10MB</li>
                      <li>• Should contain detailed invention description</li>
                      <li>• Include technical drawings if available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!isFormValid()} size="lg">
          {activeTab === "manual" ? "Process Information" : "Process PDF"}
        </Button>
      </div>
    </div>
  )
}
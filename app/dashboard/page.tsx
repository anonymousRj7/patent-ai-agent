"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import PatentFormatSelection from "@/components/patent-format-selection"
import InventionInformationForm from "@/components/invention-information-form"
import AIPatentGeneration from "@/components/ai-patent-generation"

interface PatentOffice {
  id: string
  name: string
  fullName: string
  flag: string
  description: string
  processingTime: string
  cost: string
  coverage: string
  popular: boolean
}

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

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOffice, setSelectedOffice] = useState<PatentOffice | undefined>()
  const [inventionData, setInventionData] = useState<InventionData | File | undefined>()
  const [patentGenerated, setPatentGenerated] = useState(false)
  const totalSteps = 3

  const steps = [
    {
      id: 1,
      title: "Patent Format Selection",
      description: "Choose your target patent office and jurisdiction",
      completed: selectedOffice !== undefined,
    },
    {
      id: 2,
      title: "Invention Information",
      description: "Provide details about your invention or upload disclosure",
      completed: inventionData !== undefined,
    },
    {
      id: 3,
      title: "AI Patent Generation",
      description: "Generate your complete patent with AI assistance",
      completed: patentGenerated,
    },
  ]

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

  const handleNext = () => {
    if (currentStep === 1 && !selectedOffice) {
      alert("Please select a patent office before proceeding.")
      return
    }
    if (currentStep === 2 && !inventionData) {
      alert("Please provide invention information before proceeding.")
      return
    }
    setCurrentStep(Math.min(totalSteps, currentStep + 1))
  }

  const handleInventionSubmit = (data: InventionData | File) => {
    setInventionData(data)
    // Auto-advance to next step after successful submission
    setTimeout(() => {
      setCurrentStep(3)
    }, 500)
  }

  const handlePatentComplete = () => {
    setPatentGenerated(true)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PatentFormatSelection onSelect={setSelectedOffice} selectedOffice={selectedOffice} />
      case 2:
        return (
          <InventionInformationForm
            onSubmit={handleInventionSubmit}
            inventionData={inventionData instanceof File ? undefined : inventionData}
          />
        )
      case 3:
        return selectedOffice && inventionData ? (
          <AIPatentGeneration
            inventionData={inventionData}
            selectedOffice={selectedOffice}
            onComplete={handlePatentComplete}
          />
        ) : (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-lg font-medium text-foreground mb-2">Missing Information</p>
              <p className="text-foreground">Please complete the previous steps before generating your patent.</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="text-sm text-foreground hover:text-foreground transition-colors">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">PatentAI Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-3 py-1">
                Free Trial
              </Badge>
              <Button variant="outline" size="sm">
                Save Progress
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Patent Filing Assistant</h1>
            <div className="text-sm text-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-6" />

          {/* Step Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step) => (
              <Card
                key={step.id}
                className={`transition-all duration-300 ${
                  step.id === currentStep
                    ? "border-primary bg-primary/5"
                    : step.completed
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                      : "border-border bg-card"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.completed
                          ? "bg-green-500 text-white"
                          : step.id === currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.completed ? <CheckCircle className="h-4 w-4" /> : step.id}
                    </div>
                    <CardTitle className="text-lg !text-slate-900 dark:!text-slate-100">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="!text-slate-800 dark:!text-slate-200">{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step Content */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">{steps.find((s) => s.id === currentStep)?.title}</CardTitle>
                <CardDescription className="text-base !text-slate-800 dark:!text-slate-200">
                  {steps.find((s) => s.id === currentStep)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">{renderStepContent()}</CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Help Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Quick Tips:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Choose the jurisdiction where you want protection</li>
                    <li>• Provide detailed technical descriptions</li>
                    <li>• Include drawings or diagrams if available</li>
                    <li>• Review AI-generated content carefully</li>
                  </ul>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Documentation
                </Button>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-foreground">Estimated time remaining:</div>
                    <div className="text-lg font-semibold text-primary">
                      {currentStep === 1 ? "15-20 minutes" : currentStep === 2 ? "10-15 minutes" : "5-10 minutes"}
                    </div>
                  </div>
                  {selectedOffice && (
                    <div className="pt-2 border-t border-border">
                      <div className="text-sm text-foreground mb-1">Selected Office:</div>
                      <div className="text-sm font-medium">
                        {selectedOffice.name} - {selectedOffice.coverage}
                      </div>
                    </div>
                  )}
                  {inventionData && (
                    <div className="pt-2 border-t border-border">
                      <div className="text-sm text-foreground mb-1">Invention Data:</div>
                      <div className="text-sm font-medium">
                        {inventionData instanceof File ? `PDF: ${inventionData.name}` : "Manual Entry Completed"}
                      </div>
                    </div>
                  )}
                  {patentGenerated && (
                    <div className="pt-2 border-t border-border">
                      <div className="text-sm text-foreground mb-1">Status:</div>
                      <div className="text-sm font-medium text-green-600">Patent Generated Successfully</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card> */}

            {/* Security Notice */}
            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 dark:text-green-200">🔒 Secure & Confidential</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your invention details are encrypted and stored securely. We never share your information with third
                  parties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline">Save & Exit</Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === totalSteps || (currentStep === 3 && !patentGenerated)}
            >
              {currentStep === totalSteps ? "Complete" : "Next Step"}
              {currentStep !== totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

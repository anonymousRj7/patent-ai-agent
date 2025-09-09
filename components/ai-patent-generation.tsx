"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, AlertCircle, Sparkles } from "lucide-react";

interface PatentOffice {
  id: string;
  name: string;
  fullName: string;
  coverage: string;
}

interface InventionData {
  title: string;
  problem: string;
  solution: string;
  technicalDescription: string;
  advantages: string;
  drawingsDescription: string;
  priorArt: string;
  inventors: string;
  assignee: string;
}

interface AIPatentGenerationProps {
  inventionData: InventionData | File;
  selectedOffice: PatentOffice;
  onComplete: () => void;
}

export default function AIPatentGeneration({
  inventionData,
  selectedOffice,
  onComplete,
}: AIPatentGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const generatePatent = async () => {
    setIsGenerating(true);
    setError("");

    try {
      // Store data in localStorage
      localStorage.setItem("inventionData", JSON.stringify(inventionData));
      localStorage.setItem("selectedOffice", JSON.stringify(selectedOffice));

      // Navigate to the streaming generation page
      router.push("/patent-generation");
    } catch (err) {
      console.error("Generation error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          AI Patent Generation
        </h2>
        <p className="text-muted-foreground">
          Generate your complete patent application using advanced AI technology
        </p>
      </div>

      {/* Generation Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Generation Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Patent Office:</span>
              <div className="font-medium">{selectedOffice.fullName}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Coverage:</span>
              <div className="font-medium">{selectedOffice.coverage}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Input Type:</span>
              <div className="font-medium">
                {inventionData instanceof File
                  ? `PDF Upload (${inventionData.name})`
                  : "Manual Form Entry"}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">AI Model:</span>
              <div className="font-medium">Google Gemini 1.5 Flash</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ready to Generate</CardTitle>
          <CardDescription>
            Click the button below to start the AI patent generation process.
            You'll be taken to our advanced editor where you can watch the
            patent being created in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={generatePatent}
            disabled={isGenerating}
            size="lg"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Starting Generation...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Patent Application
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-900 dark:text-red-100 mb-2">
                  Generation Failed
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                  {error}
                </p>
                <Button onClick={generatePatent} variant="secondary" size="sm">
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

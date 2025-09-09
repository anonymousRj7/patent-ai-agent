"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Edit3,
  FileText,
  Clock,
  ArrowLeft,
  Search,
  ExternalLink,
} from "lucide-react";
import { PatentEditor } from "@/components/patent-editor";
import { getApiEndpoint } from "@/lib/api-config";
import { ApiProviderIndicator } from "@/components/api-provider-indicator";

interface PatentSection {
  title: string;
  content: string;
  isComplete: boolean;
  isGenerating: boolean;
}

interface PatentOffice {
  id: string;
  name: string;
  fullName: string;
  coverage: string;
}

const DUMMY_PRIOR_ARTS = [
  {
    id: "US10123456B2",
    title:
      "Method and System for Automated Document Processing Using Machine Learning",
    assignee: "Tech Corp Inc.",
    date: "2019-11-12",
    relevance: 85,
    abstract:
      "A system for processing documents using machine learning algorithms to extract and classify information automatically...",
    claims: 15,
    citations: 23,
  },
  {
    id: "US9876543B1",
    title:
      "Artificial Intelligence Based Content Generation and Analysis Platform",
    assignee: "AI Solutions LLC",
    date: "2018-08-15",
    relevance: 78,
    abstract:
      "An AI platform that generates and analyzes content using natural language processing and deep learning techniques...",
    claims: 12,
    citations: 18,
  },
  {
    id: "EP3456789A1",
    title: "Intelligent Document Classification System with Neural Networks",
    assignee: "European Tech GmbH",
    date: "2020-03-22",
    relevance: 72,
    abstract:
      "A neural network-based system for classifying documents and extracting relevant information for patent applications...",
    claims: 18,
    citations: 31,
  },
  {
    id: "WO2021/123456A1",
    title: "Machine Learning Approach for Patent Prior Art Search and Analysis",
    assignee: "Global Innovations Ltd.",
    date: "2021-06-17",
    relevance: 69,
    abstract:
      "A comprehensive machine learning system for searching and analyzing prior art in patent databases...",
    claims: 20,
    citations: 14,
  },
];

export default function PatentGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const [currentSection, setCurrentSection] = useState<string>("");
  const [sections, setSections] = useState<PatentSection[]>([
    { title: "Title", content: "", isComplete: false, isGenerating: false },
    { title: "Abstract", content: "", isComplete: false, isGenerating: false },
    {
      title: "Technical Field",
      content: "",
      isComplete: false,
      isGenerating: false,
    },
    {
      title: "Background",
      content: "",
      isComplete: false,
      isGenerating: false,
    },
    { title: "Summary", content: "", isComplete: false, isGenerating: false },
    { title: "Claims", content: "", isComplete: false, isGenerating: false },
    {
      title: "Detailed Description",
      content: "",
      isComplete: false,
      isGenerating: false,
    },
  ]);
  const [selectedOffice, setSelectedOffice] = useState<PatentOffice | null>(
    null
  );
  const [inventionData, setInventionData] = useState<any>(null);
  const [editorContent, setEditorContent] = useState("");
  const [showPriorArts, setShowPriorArts] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const router = useRouter();
  const streamRef = useRef<EventSource | null>(null);
  const mountedRef = useRef(false);
  const generationStartedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple mounts from triggering multiple generations
    if (mountedRef.current) return;
    mountedRef.current = true;

    const storedOffice = localStorage.getItem("selectedOffice");
    const storedInvention = localStorage.getItem("inventionData");

    if (storedOffice && storedInvention) {
      const office = JSON.parse(storedOffice);
      const invention = JSON.parse(storedInvention);

      setSelectedOffice(office);
      setInventionData(invention);

      // Only start generation if it hasn't started yet
      if (!generationStartedRef.current) {
        generationStartedRef.current = true;
        console.log("Starting patent generation...");
        startPatentGeneration(invention, office);
      }
    } else {
      router.push("/dashboard");
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.close();
      }
      mountedRef.current = false;
      generationStartedRef.current = false;
    };
  }, []);

  const startPatentGeneration = async (
    invention: any,
    office: PatentOffice
  ) => {
    if (isGenerating) {
      console.log("Generation already in progress, skipping...");
      return;
    }

    setIsGenerating(true);
    setError("");
    setGenerationComplete(false);

    console.log("Starting new patent generation...");
    try {
      const response = await fetch(getApiEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inventionData: invention,
          selectedOffice: office,
          format: "html", // Request HTML format
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start patent generation");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const dataStr = line.slice(6).trim();
              if (!dataStr) continue; // Skip empty data lines

              const data = JSON.parse(dataStr);

              if (data.type === "section_start") {
                setCurrentSection(data.section);
                setSections((prev) =>
                  prev.map((section) =>
                    section.title === data.section
                      ? { ...section, isGenerating: true }
                      : { ...section, isGenerating: false }
                  )
                );
              } else if (data.type === "content") {
                setSections((prev) =>
                  prev.map((section) =>
                    section.title === data.section
                      ? { ...section, content: section.content + data.content }
                      : section
                  )
                );
              } else if (data.type === "section_complete") {
                setSections((prev) =>
                  prev.map((section) =>
                    section.title === data.section
                      ? { ...section, isComplete: true, isGenerating: false }
                      : section
                  )
                );
              } else if (data.type === "complete") {
                setIsGenerating(false);
                setCurrentSection("");
                setGenerationComplete(true);

                setSections((currentSections) => {
                  const combinedContent = currentSections
                    .filter((section) => section.content.trim())
                    .map(
                      (section) =>
                        `## ${section.title}\n\n${section.content}\n\n`
                    )
                    .join("");

                  const markdownContent = convertToMarkdown(combinedContent);
                  setEditorContent(markdownContent);
                  return currentSections;
                });
              } else if (data.type === "error") {
                throw new Error(data.message);
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e, "Line:", line);
            }
          }
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsGenerating(false);
    }
  };

  const convertToMarkdown = (content: string) => {
    if (!content || typeof content !== "string") {
      console.warn("convertToMarkdown received invalid content:", content);
      return "";
    }

    try {
      return content
        .replace(/<h1>(.*?)<\/h1>/g, "# $1\n\n")
        .replace(/<h2>(.*?)<\/h2>/g, "## $1\n\n")
        .replace(/<h3>(.*?)<\/h3>/g, "### $1\n\n")
        .replace(/<h4>(.*?)<\/h4>/g, "#### $1\n\n")
        .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
        .replace(/<b>(.*?)<\/b>/g, "**$1**")
        .replace(/<em>(.*?)<\/em>/g, "*$1*")
        .replace(/<i>(.*?)<\/i>/g, "*$1*")
        .replace(/<ul>/g, "")
        .replace(/<\/ul>/g, "\n")
        .replace(/<ol>/g, "")
        .replace(/<\/ol>/g, "\n")
        .replace(/<li>(.*?)<\/li>/g, "- $1\n")
        .replace(/<p>(.*?)<\/p>/g, "$1\n\n")
        .replace(/<br\s*\/?>/g, "\n")
        .replace(/<div>(.*?)<\/div>/g, "$1\n")
        .replace(/<[^>]*>/g, "") // Remove remaining HTML tags
        .replace(/\n{3,}/g, "\n\n") // Replace multiple newlines with double newlines
        .trim();
    } catch (error) {
      console.error("Error converting to markdown:", error);
      return content; // Return original content if conversion fails
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editorContent);
      alert("Patent content copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const downloadPatent = () => {
    const patentText = editorContent;
    const blob = new Blob([patentText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `patent-application-${selectedOffice?.name.toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const savePatent = () => {
    const patentText = editorContent;
    localStorage.setItem("savedPatent", patentText);
    localStorage.setItem("savedPatentDate", new Date().toISOString());
    alert("Patent saved successfully!");
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      // Create a proper markdown image syntax
      const imageMarkdown = `![Uploaded Image](${src})\n\n`;
      setEditorContent((prevContent) => prevContent + imageMarkdown);
    };
    reader.readAsDataURL(file);
  };

  if (!selectedOffice || !inventionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Patent Generation</h1>
                <p className="text-sm text-muted-foreground">
                  {selectedOffice.fullName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {generationComplete && (
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Generation Complete
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Previous Patents & Prior Arts */}
          <div className="lg:col-span-1 space-y-6">
            {/* Previous Patents */}
            {/* <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Previous Patents</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No previous patents yet</p>
                  <p className="text-xs mt-2">
                    Your generated patents will appear here
                  </p>
                </div>
              </CardContent>
            </Card> */}

            {(generationComplete || isGenerating) && (
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Search className="h-5 w-5" />
                      <span>Prior Arts</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPriorArts(!showPriorArts)}
                    >
                      {showPriorArts ? "Hide" : "Show"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                {showPriorArts && (
                  <CardContent className="space-y-4">
                    {DUMMY_PRIOR_ARTS.map((patent) => (
                      <div
                        key={patent.id}
                        className="border rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm leading-tight">
                              {patent.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {patent.id} • {patent.assignee}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {patent.relevance}%
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {patent.abstract}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{patent.date}</span>
                          <div className="flex items-center space-x-2">
                            <span>{patent.claims} claims</span>
                            <span>•</span>
                            <span>{patent.citations} citations</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Full Patent
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Generation Status */}
              {isGenerating && (
                <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                      <div className="flex-1">
                        <p className="font-medium text-blue-900 dark:text-blue-100">
                          Generating Patent Application...
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {currentSection
                            ? `Currently generating: ${currentSection}`
                            : "Initializing AI generation..."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {error}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {generationComplete ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Edit3 className="h-5 w-5" />
                      <span>Patent Editor</span>
                      <Badge variant="secondary">
                        Rich Text Editor with Preview
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PatentEditor
                      content={editorContent}
                      onChange={setEditorContent}
                      onImageUpload={handleImageUpload}
                    />
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <Card
                      key={section.title}
                      className={`transition-all duration-300 ${
                        section.isGenerating
                          ? "border-blue-300 bg-blue-50/50 dark:border-blue-700 dark:bg-blue-950/20"
                          : section.isComplete
                          ? "border-green-300 bg-green-50/50 dark:border-green-700 dark:bg-green-950/20"
                          : "border-border"
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            {section.isGenerating && (
                              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                            )}
                            {section.isComplete && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                            {!section.isGenerating && !section.isComplete && (
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span>{section.title}</span>
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {section.content ? (
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                              {section.content}
                            </pre>
                          </div>
                        ) : (
                          <div className="text-muted-foreground text-sm py-4">
                            {section.isGenerating
                              ? "Generating content..."
                              : "Waiting to generate..."}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ApiProviderIndicator />
    </div>
  );
}

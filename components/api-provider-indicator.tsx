"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_CONFIG } from "@/lib/api-config";

export function ApiProviderIndicator() {
  const currentProvider = API_CONFIG.provider;
  const isGroq = currentProvider === "groq";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-48">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">API Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Badge
              variant={isGroq ? "default" : "secondary"}
              className="text-xs"
            >
              {isGroq ? "🚀 Groq (Fast)" : "🧠 Gemini"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isGroq
              ? "Using Groq API - Faster generation"
              : "Using Gemini API - Higher rate limits"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

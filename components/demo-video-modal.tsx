"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";

interface DemoVideoModalProps {
  children: React.ReactNode;
}

export function DemoVideoModal({ children }: DemoVideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Product Demo
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-4">
          <div className="relative w-full rounded-lg overflow-hidden bg-black">
            <video
              controls
              autoPlay
              className="w-full h-auto max-h-[70vh]"
              poster="/video-placeholder.jpg" // Optional: add a poster image
            >
              <source src="/website-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              See how PatentAI streamlines the entire patent filing process
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

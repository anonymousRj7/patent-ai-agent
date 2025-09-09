"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Markdown } from "tiptap-markdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  ImageIcon,
  Undo,
  Redo,
  Eye,
  Edit,
  Download,
  Highlighter,
} from "lucide-react";

interface PatentEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload: (file: File) => void;
}

export function PatentEditor({
  content,
  onChange,
  onImageUpload,
}: PatentEditorProps) {
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor(
    {
      autofocus: false,
      injectCSS: false,
      editable: true,
      immediatelyRender: false,
      enableCoreExtensions: true,
      parseOptions: {
        preserveWhitespace: "full",
      },
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3, 4],
          },
          paragraph: {
            HTMLAttributes: {
              class: "my-3",
            },
          },
        }),
        Markdown.configure({
          html: true,
          transformCopiedText: true,
          transformPastedText: true,
        }),
        Image.configure({
          HTMLAttributes: {
            class: "max-w-full h-auto rounded-lg border",
          },
        }),
        Placeholder.configure({
          placeholder: "Start editing your patent document...",
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Underline,
        Highlight.configure({
          multicolor: true,
        }),
      ],
      content,
      onUpdate: ({ editor }) => {
        // Convert editor content to markdown format with error handling
        try {
          const markdown = editor.storage?.markdown?.getMarkdown?.();
          if (markdown) {
            onChange(markdown);
          } else {
            // Fallback to plain text if markdown conversion fails
            console.warn("Markdown conversion failed, using plain text");
            onChange(editor.getText());
          }
        } catch (error) {
          console.error("Error converting to markdown:", error);
          onChange(editor.getText());
        }
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[500px] p-6 max-w-none",
        },
        handleDrop: (view, event, slice, moved) => {
          if (!moved && event.dataTransfer?.files?.[0]) {
            const file = event.dataTransfer.files[0];
            if (file.type.startsWith("image/")) {
              onImageUpload(file);
              return true;
            }
          }
          return false;
        },
      },
    },
    [isMounted] // Only initialize editor after component is mounted
  );

  // Don't render until mounted
  if (!isMounted) {
    return null;
  }

  if (!editor) {
    return null;
  }

  const downloadPatent = () => {
    if (!editor) return;
    // Get content either as markdown or plain text
    const content =
      editor.storage?.markdown?.getMarkdown?.() || editor.getText();
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patent-application.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b p-2 bg-muted/50 flex items-center gap-1 flex-wrap">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 mr-4">
          <Button
            variant={viewMode === "edit" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("edit")}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant={viewMode === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("preview")}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {viewMode === "edit" && (
          <>
            {/* Text Formatting */}
            <Button
              variant={editor.isActive("bold") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("italic") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("underline") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("strike") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("highlight") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
              <Highlighter className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Alignment */}
            <Button
              variant={
                editor.isActive({ textAlign: "left" }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={
                editor.isActive({ textAlign: "center" }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={
                editor.isActive({ textAlign: "right" }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <AlignRight className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Lists */}
            <Button
              variant={editor.isActive("bulletList") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("orderedList") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("blockquote") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("codeBlock") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <Code className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="editor-image-upload"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                document.getElementById("editor-image-upload")?.click()
              }
            >
              <ImageIcon className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Undo/Redo */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo className="h-4 w-4" />
            </Button>

            <div className="ml-auto text-xs text-muted-foreground">
              Drag and drop images directly into the editor
            </div>
          </>
        )}

        {/* Download Button - always visible */}
        <div className="ml-auto">
          <Button variant="outline" size="sm" onClick={downloadPatent}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {viewMode === "edit" ? (
        <EditorContent editor={editor} className="min-h-[500px]" />
      ) : (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto p-6 max-w-none min-h-[500px]">
          <div className="mb-4">
            <Badge variant="secondary">Preview Mode</Badge>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: editor.getHTML(),
            }}
          />
        </div>
      )}
    </div>
  );
}

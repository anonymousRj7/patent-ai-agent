import { Editor } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    markdown: {
      setMarkdown: (markdown: string) => ReturnType;
    };
  }
}

declare module '@tiptap/core' {
  interface Storage {
    markdown: {
      getMarkdown: () => string;
    };
  }
}

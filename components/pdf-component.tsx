"use client";

import React, { useEffect, useRef } from "react";

interface ToolbarItem {
  type: string;
  id?: string;
  title?: string;
  node?: HTMLElement;
  onPress?: (event: MouseEvent | TouchEvent) => void;
}

interface InlineTextSelectionToolbarArgs {
  defaultItems: ToolbarItem[];
  hasDesktopLayout: boolean;
}

interface TextSelection {
  text?: string;
  range?: Range;
}

interface PdfComponentProps {
  filename: string;
}

export default function PdfComponent({ filename }: PdfComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const NutrientViewer = (window as any).NutrientViewer;

    async function fetchAndLoadPdf() {
      try {
        // Create a custom DOM node for our larger question mark with improved styling
        const questionMarkNode = document.createElement("div");
        questionMarkNode.textContent = "?";
        questionMarkNode.style.fontSize = "18px";
        questionMarkNode.style.lineHeight = "1";
        questionMarkNode.style.cursor = "pointer";
        questionMarkNode.style.backgroundColor = "#4a5568";
        questionMarkNode.style.color = "white";
        questionMarkNode.style.width = "28px";
        questionMarkNode.style.height = "28px";
        questionMarkNode.style.borderRadius = "50%";
        questionMarkNode.style.display = "flex";
        questionMarkNode.style.alignItems = "center";
        questionMarkNode.style.justifyContent = "center";
        questionMarkNode.style.padding = "4px";

        // Define our custom item with the DOM node.
        const questionMarkItem: ToolbarItem = {
          type: "custom",
          id: "question-mark-button",
          node: questionMarkNode,
          onPress: () => {
            // We'll replace `selection` in scope below
          },
        };

        // Load the PDF, specifying the inline text selection toolbar items.
        const instance = await NutrientViewer.load({
          container,
          document: `/${filename}`,
          inlineTextSelectionToolbarItems: (
            { defaultItems, hasDesktopLayout }: InlineTextSelectionToolbarArgs,
            selection: TextSelection
          ) => {
            // Overwrite the onPress to have the correct selection context.
            questionMarkItem.onPress = () => {
              if (selection && selection.text) {
                console.log("Selected text:", selection.text);
              } else {
                console.log("No text selected.");
              }
            };

            // Remove all default items so only our custom question mark remains.
            // If you only wanted this on desktop, you could do a conditional check:
            // if (hasDesktopLayout) { return [questionMarkItem]; }
            // else { return defaultItems; }
            return [questionMarkItem];
          },
        });

        // Example: controlling the main (top) toolbar items
        const items = instance.toolbarItems;
        const allowedTypes = ["export-pdf", "search", "pager"];
        instance.setToolbarItems(
          items.filter((item: any) => allowedTypes.includes(item.type))
        );
      } catch (err) {
        console.error("Error loading PDF:", err);
      }
    }

    if (container && NutrientViewer) {
      fetchAndLoadPdf();
    }

    // Unload when component unmounts
    return () => {
      if (container && NutrientViewer) {
        NutrientViewer.unload(container);
      }
    };
  }, [filename]);

  return <div ref={containerRef} className="h-full w-full" />;
}

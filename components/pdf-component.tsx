"use client";

import React, { useEffect, useRef } from "react";

interface PdfComponentProps {
  filename: string;
}

export default function PdfComponent({ filename }: PdfComponentProps) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const NutrientViewer = (window as any).NutrientViewer;

    async function fetchAndLoadPdf() {
      try {
        // Load returns a Promise that resolves to the instance
        const instance = await NutrientViewer.load({
          container,
          document: `/${filename}`,
          // Here is where we define our custom inline text selection item:
          inlineTextSelectionToolbarItems: (
            { defaultItems, hasDesktopLayout },
            selection
          ) => {
            // Create a custom item that shows a "?" and logs the selected text
            const questionMarkItem = {
              type: "custom",
              id: "question-mark-button",
              title: "?", // Will display "?" on the button
              onPress: () => {
                // Log the selection to the console
                // "selection.text" holds the currently selected text
                if (selection && selection.text) {
                  console.log("Selected text:", selection.text);
                } else {
                  console.log("No text selected.");
                }
              },
            };

            // Only add the custom button on desktop layout for this example
            if (hasDesktopLayout) {
              return [...defaultItems, questionMarkItem];
            }
            return defaultItems;
          },
        });

        // Example of customizing the main toolbar items:
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
      NutrientViewer?.unload(container);
    };
  }, [filename]);

  return <div ref={containerRef} className="h-full w-full" />;
}

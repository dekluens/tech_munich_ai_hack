"use client";

import React, { useEffect, useRef } from "react";

export default function ResourcesContainer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    // Type assertion to access NutrientViewer
    const NutrientViewer = (window as any).NutrientViewer;

    async function fetchAndLoadPdf() {
      try {
        // This calls our Next.js API route
        const response = await fetch(
          "/api/pdf/21191-v1_0-betriebsanleitung-anlagenpark-tv73-stiftung-finneck.pdf"
        );
        const blob = await response.blob();

        // Convert Blob to an ObjectURL for the viewer
        const objectUrl = URL.createObjectURL(blob);

        // Use NutrientViewer directly instead of from window
        NutrientViewer.load({
          container,
          document: objectUrl,
        });
      } catch (err) {
        console.error("Error loading PDF:", err);
      }
    }

    if (container && NutrientViewer) {
      fetchAndLoadPdf();
    }

    return () => {
      NutrientViewer?.unload(container);
    };
  }, []);

  return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />;
}

"use client";

import React, { useEffect, useRef } from "react";

export default function ResourcesContainer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const NutrientViewer = (window as any).NutrientViewer;
    const defaultItems = NutrientViewer.defaultToolbarItems;
    console.log(defaultItems);

    async function fetchAndLoadPdf() {
      try {
        // This calls our Next.js API route to get your PDF
        // const response = await fetch("/api/pdf/my.pdf");
        // const blob = await response.blob();
        // const objectUrl = URL.createObjectURL(blob);

        // Load returns a Promise that resolves to the instance
        const instance = await NutrientViewer.load({
          container,
          document: "/antragaufenthaltstitel.pdf",
        });

        // Now that you have the instance, you can adjust the toolbar, etc.
        const items = instance.toolbarItems;
        const allowedTypes = ["export-pdf", "search", "pager"]; // define allowed types here
        instance.setToolbarItems(
          items.filter((item: any) => allowedTypes.includes(item.type))
        );

        // You could also save `instance` to a ref if you need it later
        // instanceRef.current = instance;
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
  }, []);

  return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />;
}

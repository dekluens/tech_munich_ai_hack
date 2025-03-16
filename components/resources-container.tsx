"use client";

import { useState } from "react";
import PdfComponent from "./pdf-component";
import {
  ChevronRight,
  ClipboardList,
  FileQuestion,
  Clock,
  ArrowLeft,
  HelpCircle,
  MousePointer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Enhanced resources with type and complexity information
const resources = [
  {
    id: 1,
    title: "Registration Certificate",
    description: "Form for registering a residence",
    filename: "registration.pdf",
    type: "form",
    complexity: "medium",
    estimatedTime: "15 min",
  },
  {
    id: 2,
    title: "Income Tax Return",
    description: "Form for annual tax declaration",
    filename: "tax.pdf",
    type: "form",
    complexity: "high",
    estimatedTime: "45 min",
  },
  {
    id: 3,
    title: "Child Benefit Application",
    description: "Form for child benefits",
    filename: "childbenefit.pdf",
    type: "form",
    complexity: "medium",
    estimatedTime: "20 min",
  },
  {
    id: 4,
    title: "Residence Permit",
    description: "Information about residence permits",
    filename: "residence.pdf",
    type: "guide",
    complexity: "low",
    estimatedTime: null,
  },
];

export default function ResourcesContainer() {
  const [selectedResource, setSelectedResource] = useState<number | null>(null);

  // If a resource is selected, show the PDF component
  if (selectedResource !== null) {
    const resource = resources.find((r) => r.id === selectedResource);

    return (
      <div className="h-full w-full flex flex-col">
        <div className="p-4 bg-gray-100 flex items-center justify-between">
          <button
            onClick={() => setSelectedResource(null)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-1" size={16} />
            Back to resources
          </button>

          {resource?.type === "form" && (
            <div className="flex items-center text-gray-600 text-sm">
              <Clock size={14} className="mr-1" />
              <span>Est. completion time: {resource.estimatedTime}</span>
            </div>
          )}
        </div>

        {/* Interactive PDF hint */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-1 rounded-r-md">
          <div className="flex items-start">
            <div className="mr-3 mt-1 text-blue-500">
              <HelpCircle size={20} />
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">
                Interactive PDF Assistance
              </h4>
              <p className="text-blue-800 text-sm">
                Select any text in the PDF that you don't understand, and a{" "}
                <HelpCircle className="inline h-4 w-4 text-blue-600" /> icon
                will appear. Click it to get an explanation from the assistant.
              </p>

              <div className="mt-3 bg-white p-3 rounded border border-blue-200 flex items-center text-sm">
                <div className="flex items-center mr-4">
                  <MousePointer size={14} className="mr-1 text-gray-500" />
                  <span className="text-gray-700">Select text</span>
                </div>
                <div className="flex items-center mr-4">
                  <span className="mx-2">→</span>
                </div>
                <div className="flex items-center mr-4">
                  <HelpCircle size={14} className="mr-1 text-blue-600" />
                  <span className="text-gray-700">Click icon</span>
                </div>
                <div className="flex items-center mr-4">
                  <span className="mx-2">→</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700">Get explanation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <PdfComponent filename="application_document.pdf" />
        </div>
      </div>
    );
  }

  // Otherwise show the list of resources
  return (
    <div className="h-full w-full bg-gray-50 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-2">Available Resources</h2>
      <p className="text-gray-600 mb-6">
        Forms and guides to help with German bureaucratic procedures
      </p>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            onClick={() => setSelectedResource(resource.id)}
            className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border ${
              resource.type === "form"
                ? "border-l-4 border-l-blue-500 border-t-gray-200 border-r-gray-200 border-b-gray-200"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-start">
              <div
                className={`p-2 rounded-lg mr-3 ${
                  resource.type === "form" ? "bg-blue-100" : "bg-amber-100"
                }`}
              >
                {resource.type === "form" ? (
                  <ClipboardList className="text-blue-600" size={24} />
                ) : (
                  <FileQuestion className="text-amber-600" size={24} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h3 className="font-medium text-lg">{resource.title}</h3>
                  {resource.type === "form" && (
                    <Badge
                      variant="outline"
                      className="ml-2 bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Form
                    </Badge>
                  )}
                  {resource.type === "guide" && (
                    <Badge
                      variant="outline"
                      className="ml-2 bg-amber-50 text-amber-700 border-amber-200"
                    >
                      Guide
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{resource.description}</p>

                {resource.type === "form" && (
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    <span>Est. time: {resource.estimatedTime}</span>

                    <div className="ml-3 flex items-center">
                      <span className="mr-1">Complexity:</span>
                      <div className="flex space-x-1">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            resource.complexity === "low" ||
                            resource.complexity === "medium" ||
                            resource.complexity === "high"
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            resource.complexity === "medium" ||
                            resource.complexity === "high"
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            resource.complexity === "high"
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <ChevronRight className="text-gray-400 self-center" size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

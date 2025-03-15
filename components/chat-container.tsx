"use client";
import { useChat } from "@ai-sdk/react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [
        {
          id: "1",
          role: "assistant",
          content:
            "Hello! I am your German Bureaucracy Assistant. How can I help you today?",
        },
      ],
    });

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">German Bureaucracy Assistant</h2>
        <p className="text-sm opacity-80">
          I'll help you with forms and administrative procedures
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white rounded-tr-none"
                  : "bg-gray-100 text-gray-800 rounded-tl-none"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your question here..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}

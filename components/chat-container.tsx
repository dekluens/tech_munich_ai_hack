"use client";
import { useChat } from "@ai-sdk/react";
import { User, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useEffect } from "react";

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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-b-xl shadow-md">
        <div className="flex items-center">
          <div className="bg-white/20 p-2 rounded-full mr-3">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              German Bureaucracy Assistant
            </h2>
            <p className="text-sm opacity-90">
              I'll help you navigate German administrative procedures
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            } items-start`}
          >
            {message.role !== "user" && (
              <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                <Bot size={18} className="text-blue-600" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                message.role === "user"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none"
                  : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
              }`}
            >
              {message.content}
            </div>
            {message.role === "user" && (
              <div className="bg-blue-600 p-2 rounded-full ml-3 flex-shrink-0">
                <User size={18} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Bot size={18} className="text-blue-600" />
            </div>
            <div className="bg-white border border-gray-200 text-gray-800 p-4 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
              <div className="flex space-x-2">
                <div
                  className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 bg-gray-50 p-2 rounded-full border border-gray-200 shadow-sm"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your question here..."
            className="flex-1 border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-full w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <ArrowRight size={18} className="text-white" />
            )}
          </Button>
        </form>
        <div className="text-xs text-center mt-2 text-gray-500">
          Ask me about residence registration, visa applications, tax forms, or
          any German bureaucratic process
        </div>
      </div>
    </div>
  );
}

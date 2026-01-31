"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_AI_RESPONSES } from "@/lib/mockData";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function ChatUI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "0",
      role: "assistant",
      content: MOCK_AI_RESPONSES.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Mock AI response after short delay
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: MOCK_AI_RESPONSES.followup,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1200);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-soft">
      {/* Disclaimer */}
      <div className="border-b border-gray-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-800">
        <strong>Disclaimer:</strong> AI suggestions are not a replacement for
        certified doctors. Always consult a healthcare professional for diagnosis
        and treatment.
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <Bot className="h-4 w-4" aria-hidden />
                </div>
              )}
              <div
                className={`
                  max-w-[85%] rounded-2xl px-4 py-2.5 text-sm
                  ${
                    msg.role === "user"
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }
                `}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  <User className="h-4 w-4" aria-hidden />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <Bot className="h-4 w-4" aria-hidden />
            </div>
            <div className="rounded-2xl bg-gray-100 px-4 py-2.5">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500" />
              </span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Describe your symptoms or ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            className="min-h-[44px] resize-none"
            disabled={isLoading}
          />
          <Button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="self-end"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      message:
        "Hello! Thanks for reaching out to Social Hardware support. What can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMessage = { role: "user", message: inputMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://chatbot.squirrel.thesquirrel.site/chat/socialhardware",
        [...messages, newUserMessage]
      );
      if (response.data.response) {
        const assistantMessage = {
          role: "assistant",
          message: response.data.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const MessageContent = ({ content, isUser }) => (
    <div className={`prose prose-invert max-w-none ${isUser ? 'text-black' : 'text-white'}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} className="text-blue-300 hover:text-blue-400 underline" target="_blank" rel="noopener noreferrer" />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc list-inside my-2" />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="my-1 ml-1" />
          ),
          strong: ({ node, ...props }) => (
            <strong {...props} className="font-semibold" />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="my-2" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-[#0D0D0D] rounded-xl border border-[#353232] shadow-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 bg-[#353232]">
            <h3 className="text-white font-bold flex items-center gap-2">
              <FaRobot className="text-[#FC8500]" />
              Chat with Eclipse
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#D4D4D4] hover:text-white"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end h-fit" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg ${
                    msg.role === "user"
                      ? "bg-[#FC8500] !h-fit px-2 !text-white"
                      : "bg-[#353232] p-3"
                  }`}
                >
                  <MessageContent content={msg.message} isUser={msg.role === "user"} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#353232] text-white rounded-lg p-3">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-[#353232]"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#353232] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC8500]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#FC8500] hover:bg-[#e67a00] text-black px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#FC8500] hover:bg-[#e67a00] transition-colors duration-300 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      >
        <FaRobot size={24} className="text-black" />
      </button>
    </div>
  );
}

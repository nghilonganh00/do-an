"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@/src/features/chatbot/hooks/useChat";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
      type: "bot",
    },
  ]);
  const [query, setQuery] = useState<string>("");
  const { mutateAsync: chat } = useChat();
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const handleSend = async () => {
    if (!query) return;
    setQuery("");
    setMessages((prev) => [...prev, { id: Date.now(), message: query, type: "user" }]);

    const response = await chat(query);
    setMessages((prev) => [...prev, { id: Date.now(), message: response.message, type: "bot" }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-[350px] h-[450px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-primary-500 p-4 flex justify-between items-center text-white">
            <h3 className="text-body-medium-600">Trợ lý ảo AI</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-[var(--color-gray-50)]">
            <div className="flex flex-col gap-3">
              {messages?.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.type === "bot" ? "self-start" : "self-end"
                  } bg-white p-3 rounded-lg rounded-tl-none rounded-tr-none shadow-sm border border-gray-100 max-w-[80%]`}
                >
                  <p className="text-body-small-400 text-gray-700">{message.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white border-t border-gray-100">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-body-small-400 focus:outline-none focus:border-[var(--color-primary-500)]"
              />
              <button
                onClick={handleSend}
                className="bg-[var(--color-primary-500)] text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[var(--color-primary-500)] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform active:scale-95"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        )}
      </button>
    </div>
  );
}

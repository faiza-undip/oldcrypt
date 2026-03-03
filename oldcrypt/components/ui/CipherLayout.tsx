"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CipherLayoutProps {
  title: string;
  icon?: React.ReactNode;
  mode: "encrypt" | "decrypt";
  onModeChange: (m: "encrypt" | "decrypt") => void;
  inputLabel?: string;
  children: React.ReactNode;
  output: string;
  extra?: React.ReactNode;
}

export default function CipherLayout({
  title,
  icon,
  mode,
  onModeChange,
  children,
  output,
  extra,
}: CipherLayoutProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-8 py-3 flex items-center gap-8 sticky top-0 z-10">
        <span className="text-[#2d6a2d] font-bold text-lg tracking-tight font-mono">
          OldCrypt
        </span>
        <button
          onClick={() => onModeChange("encrypt")}
          className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
            mode === "encrypt"
              ? "border-[#4caf50] text-[#4caf50]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Enkode
        </button>
        <button
          onClick={() => onModeChange("decrypt")}
          className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
            mode === "decrypt"
              ? "border-[#4caf50] text-[#4caf50]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Dekode
        </button>
      </nav>

      <div className="flex flex-1">
        {/* Left panel */}
        <div className="flex-1 max-w-2xl px-10 py-8 flex flex-col gap-6">
          {/* Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-400 flex items-center justify-center text-white text-xl">
              {icon ?? "🔐"}
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>

          {children}
        </div>

        {/* Right panel */}
        <div className="w-[380px] bg-white border-l border-gray-100 px-8 py-10 flex flex-col gap-6">
          <div>
            <p className="text-sm text-gray-400 mb-3">
              {mode === "encrypt" ? "Ciphertext" : "Plaintext"}
            </p>
            <div className="relative bg-[#f0f7f0] rounded-xl p-5 min-h-[130px]">
              <p className="text-[#4a8c4a] font-mono text-base break-all leading-relaxed">
                {output || (
                  <span className="text-gray-300 italic">
                    hasil akan muncul di sini...
                  </span>
                )}
              </p>
              {output && (
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 text-gray-400 hover:text-green-600 transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              )}
            </div>
          </div>
          {extra}
        </div>
      </div>

      <footer className="text-right text-xs text-gray-400 px-8 py-4">
        Made with ❤️ by Faiza
        <br />
        21120123140056
      </footer>
    </div>
  );
}

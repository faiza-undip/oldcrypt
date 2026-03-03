"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Image from "next/image";

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
    <div className="min-h-screen flex flex-col font-dm-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-12 px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-row items-center">
            <Image
              className="mr-3 w-10 h-10"
              src="/oldcrypt-logo.png"
              height={1920}
              width={1080}
              unoptimized
              alt="OldCrypt logo"
            />
            <span className="text-[#275105] text-xl font-medium tracking-tight font-playfair">
              OldCrypt
            </span>
          </div>

          {/* Tabs (underline pendek, center) */}
          <div className="mt-5 flex items-center gap-10">
            {/* Enkode */}
            <button
              type="button"
              onClick={() => onModeChange("encrypt")}
              className={`relative pb-4 text-sm font-medium transition-colors cursor-pointer ${
                mode === "encrypt"
                  ? "text-[#559520]"
                  : "text-gray-800 hover:text-gray-900"
              }`}
            >
              Enkode
              {mode === "encrypt" && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-[3px] w-24 rounded-full bg-[#7EC844]" />
              )}
            </button>

            {/* Dekode */}
            <button
              type="button"
              onClick={() => onModeChange("decrypt")}
              className={`relative pb-4 text-sm font-medium transition-colors cursor-pointer ${
                mode === "decrypt"
                  ? "text-[#559520]"
                  : "text-gray-800 hover:text-gray-900"
              }`}
            >
              Dekode
              {mode === "decrypt" && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-[3px] w-24 rounded-full bg-[#7EC844]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="w-full grid grid-cols-1 md:grid-cols-4 bg-white flex-1">
        {/* Left panel */}
        <div className="md:col-span-3 md:w-3/4 w-full flex flex-col gap-6 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-400 flex items-center justify-center text-white text-xl shrink-0">
              <svg
                className="fill-[#FFF3C7]"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM88,200a12,12,0,1,1,12-12A12,12,0,0,1,88,200Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,88,160Zm40,40a12,12,0,1,1,12-12A12,12,0,0,1,128,200Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,160Zm40,40a12,12,0,1,1,12-12A12,12,0,0,1,168,200Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,168,160Zm16-56a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8Z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>

          {children}
        </div>

        {/* Right panel */}
        <aside className="md:col-span-1 w-full border-t md:border-t-0 md:border-l border-gray-100 px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-6">
          <div>
            <p className="text-sm text-[#6D6D6D] mb-3 text-center font-medium">
              {mode === "encrypt" ? "Ciphertext" : "Plaintext"}
            </p>

            <div className="relative bg-[#F2F9EE] rounded-xl p-5 min-h-[130px]">
              <p className="text-[#5F9F35] font-medium font-mono text-base break-words leading-relaxed">
                {output || (
                  <span className="text-[#A9A9A9] italic font-dm-sans">
                    Hasil akan muncul di sini...
                  </span>
                )}
              </p>

              {output && (
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 text-gray-400 hover:text-[#51A608] cursor-pointer transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              )}
            </div>
          </div>

          {extra}

          {/* Footer */}
          <footer className="mt-auto text-right text-xs text-gray-400 pt-6">
            Made with ❤️ by Faiza
            <br />
            21120123140056
          </footer>
        </aside>
      </div>
    </div>
  );
}

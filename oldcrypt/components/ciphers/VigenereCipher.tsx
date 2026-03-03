"use client";

import { useState } from "react";

import CipherLayout from "@/components/ui/CipherLayout";

import { vigenereEncrypt, vigenereDecrypt } from "@/lib/ciphers/vignere";

export default function VigenereCipher() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [key, setKey] = useState("cryptii");
  const [text, setText] = useState("You had me at hello");
  const [output, setOutput] = useState("");

  const handleProcess = () => {
    setOutput(
      mode === "encrypt"
        ? vigenereEncrypt(text, key)
        : vigenereDecrypt(text, key),
    );
  };

  return (
    <CipherLayout
      title="Vigenere Cipher Standard (26 Alphabets)"
      mode={mode}
      onModeChange={(m) => {
        setMode(m);
        setOutput("");
      }}
      output={output}
    >
      {/* Cipher type selector */}
      <div>
        <label className="block text-sm text-gray-500 mb-1">Tipe Cipher</label>
        <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
          <option>Vigenere</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">Key</label>
        <input
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">
          {mode === "encrypt" ? "Plaintext" : "Ciphertext"}
        </label>
        <textarea
          rows={7}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        onClick={handleProcess}
        className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {mode === "encrypt" ? "Enkode" : "Dekode"}
      </button>
    </CipherLayout>
  );
}

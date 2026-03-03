"use client";

import { useState } from "react";

import CipherLayout from "@/components/ui/CipherLayout";

import {
  playfairEncrypt,
  playfairDecrypt,
  buildPlayfairSquare,
} from "@/lib/ciphers/playfair";

export default function PlayfairCipher() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [key, setKey] = useState("Gravity Falls");
  const [text, setText] = useState("Attack at dawn");
  const [output, setOutput] = useState("");

  const handleProcess = () => {
    setOutput(
      mode === "encrypt"
        ? playfairEncrypt(text, key)
        : playfairDecrypt(text, key),
    );
  };

  const square = buildPlayfairSquare(key);

  return (
    <CipherLayout
      title="Playfair Cipher"
      mode={mode}
      onModeChange={(m) => {
        setMode(m);
        setOutput("");
      }}
      output={output}
      extra={
        <div>
          <p className="text-sm text-gray-400 mb-3">Playfair Square</p>
          <div className="border-l border-r border-gray-200 px-3">
            {square.map((row, r) => (
              <div key={r} className="flex gap-4 py-1">
                {row.map((cell, c) => (
                  <span
                    key={c}
                    className="w-5 text-center text-sm font-mono text-gray-700"
                  >
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div>
        <label className="block text-sm text-gray-500 mb-1">Tipe Cipher</label>
        <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
          <option>Playfair</option>
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

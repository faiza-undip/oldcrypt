"use client";

import { useState } from "react";

import CipherLayout from "@/components/ui/CipherLayout";

import { affineEncrypt, affineDecrypt, isValidA } from "@/lib/ciphers/affine";

export default function AffineCipher() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [a, setA] = useState(5);
  const [b, setB] = useState(8);
  const [text, setText] = useState("You had me at hello");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleProcess = () => {
    if (!isValidA(a)) {
      setError(
        "Nilai A harus coprime dengan 26 (1,3,5,7,9,11,15,17,19,21,23,25)",
      );
      return;
    }
    setError("");
    setOutput(
      mode === "encrypt"
        ? affineEncrypt(text, a, b)
        : affineDecrypt(text, a, b),
    );
  };

  return (
    <CipherLayout
      title="Affine Cipher"
      mode={mode}
      onModeChange={(m) => {
        setMode(m);
        setOutput("");
      }}
      output={output}
    >
      <div>
        <label className="block text-sm text-gray-500 mb-1">Tipe Cipher</label>
        <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
          <option>Affine</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Slope / A</label>
          <input
            type="range"
            min={1}
            max={25}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full accent-green-500"
          />
          <div className="mt-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-center w-16">
            {a}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Intercept / B
          </label>
          <input
            type="range"
            min={0}
            max={25}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full accent-green-500"
          />
          <div className="mt-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-center w-16">
            {b}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

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

"use client";

import { useState } from "react";

import CipherLayout from "@/components/ui/CipherLayout";

import { hillEncrypt, hillDecrypt, isValidHillKey } from "@/lib/ciphers/hill";

export default function HillCipher() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [matrix, setMatrix] = useState([
    [0, 1],
    [1, 1],
  ]);
  const [text, setText] = useState("You had me at hello");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const setCell = (r: number, c: number, val: string) => {
    const n = [...matrix.map((row) => [...row])];
    n[r][c] = parseInt(val) || 0;
    setMatrix(n);
  };

  const handleProcess = () => {
    if (!isValidHillKey(matrix)) {
      setError("Matriks tidak valid (determinan tidak coprime dengan 26)");
      return;
    }
    setError("");
    setOutput(
      mode === "encrypt"
        ? hillEncrypt(text, matrix)
        : hillDecrypt(text, matrix),
    );
  };

  const labels = ["Matrix 1", "Matrix 2", "Matrix 3", "Matrix 4"];
  const cells = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  return (
    <CipherLayout
      title="Hill Cipher"
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
          <option>Hill</option>
        </select>
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

      <div className="border border-gray-100 rounded-xl p-4 grid grid-cols-2 gap-4">
        {cells.map(([r, c], i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-sm text-gray-400 w-20">{labels[i]}</span>
            <input
              type="number"
              className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-300"
              value={matrix[r][c]}
              onChange={(e) => setCell(r, c, e.target.value)}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        onClick={handleProcess}
        className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {mode === "encrypt" ? "Enkode" : "Dekode"}
      </button>
    </CipherLayout>
  );
}

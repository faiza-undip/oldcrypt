"use client";

import { useState } from "react";

import CipherLayout from "@/components/ui/CipherLayout";

import { enigmaProcess, EnigmaConfig } from "@/lib/ciphers/enigma";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ROTOR_NAMES = ["I", "II", "III", "IV", "V"] as const;
type RotorName = (typeof ROTOR_NAMES)[number];

export default function EnigmaCipher() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [text, setText] = useState("You had me at hello");
  const [output, setOutput] = useState("");
  const [rotors, setRotors] = useState<[RotorName, RotorName, RotorName]>([
    "I",
    "III",
    "II",
  ]);
  const [positions, setPositions] = useState<[number, number, number]>([
    1, 3, 8,
  ]);
  const [rings, setRings] = useState<[number, number, number]>([0, 25, 9]);

  const setRotor = (i: 0 | 1 | 2, v: RotorName) => {
    const r = [...rotors] as [RotorName, RotorName, RotorName];
    r[i] = v;
    setRotors(r);
  };
  const setPos = (i: 0 | 1 | 2, v: number) => {
    const p = [...positions] as [number, number, number];
    p[i] = ((v % 26) + 26) % 26;
    setPositions(p);
  };
  const setRing = (i: 0 | 1 | 2, v: number) => {
    const r = [...rings] as [number, number, number];
    r[i] = ((v % 26) + 26) % 26;
    setRings(r);
  };

  const handleProcess = () => {
    const config: EnigmaConfig = { rotors, positions, rings };
    setOutput(enigmaProcess(text, config));
  };

  const rotorLabels = ["Rotor 1", "Rotor 2", "Rotor 3"] as const;

  return (
    <CipherLayout
      title="Enigma Cipher"
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
          <option>Enigma</option>
        </select>
      </div>

      {([0, 1, 2] as const).map((i) => (
        <div key={i} className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              {rotorLabels[i]}
            </label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
              value={rotors[i]}
              onChange={(e) => setRotor(i, e.target.value as RotorName)}
            >
              {ROTOR_NAMES.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Position</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1.5">
              <button
                onClick={() => setPos(i, positions[i] - 1)}
                className="text-gray-400 hover:text-gray-700 px-1"
              >
                −
              </button>
              <span className="flex-1 text-center text-sm font-mono">
                {positions[i] + 1} {ALPHABET[positions[i]]}
              </span>
              <button
                onClick={() => setPos(i, positions[i] + 1)}
                className="text-gray-400 hover:text-gray-700 px-1"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Ring</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1.5">
              <button
                onClick={() => setRing(i, rings[i] - 1)}
                className="text-gray-400 hover:text-gray-700 px-1"
              >
                −
              </button>
              <span className="flex-1 text-center text-sm font-mono">
                {rings[i] + 1} {ALPHABET[rings[i]]}
              </span>
              <button
                onClick={() => setRing(i, rings[i] + 1)}
                className="text-gray-400 hover:text-gray-700 px-1"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      <div>
        <label className="block text-sm text-gray-500 mb-1">
          {mode === "encrypt" ? "Plaintext" : "Ciphertext"}
        </label>
        <textarea
          rows={5}
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

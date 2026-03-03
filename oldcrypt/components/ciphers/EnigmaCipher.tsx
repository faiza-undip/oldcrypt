"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import CipherLayout from "@/components/ui/CipherLayout";

import { enigmaProcess, EnigmaConfig } from "@/lib/ciphers/enigma";
import { CIPHER_TYPES } from "@/constants/cipherTypes";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ROTOR_NAMES = ["I", "II", "III", "IV", "V"] as const;
type RotorName = (typeof ROTOR_NAMES)[number];

export default function EnigmaCipher() {
  const router = useRouter();
  const pathname = usePathname();

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
  const [error, setError] = useState("");

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
    // Validasi rotor unik (umum untuk Enigma 3-rotor)
    const rotorSet = new Set(rotors);
    if (rotorSet.size !== rotors.length) {
      setError("Rotor tidak boleh sama/duplikat. Pilih 3 rotor yang berbeda.");
      return;
    }

    // Validasi range defensif (setter sudah modulo, tapi ini untuk safety)
    const inRange = (n: number) => Number.isInteger(n) && n >= 0 && n < 26;
    if (!positions.every(inRange)) {
      setError("Position harus berada di rentang 1–26.");
      return;
    }
    if (!rings.every(inRange)) {
      setError("Ring harus berada di rentang 1–26.");
      return;
    }

    setError("");
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
        setError("");
      }}
      output={output}
    >
      <div>
        <label
          className="block text-sm text-[#848484] font-medium"
          style={{ marginBottom: "5px" }}
        >
          Tipe Cipher
        </label>
        <select
          onChange={(e) => {
            const next = e.target.value;
            router.push(`/cipher/${next}`);
          }}
          defaultValue="enigma"
          className="select select-[#BABABA] outline-none rounded-lg cursor-pointer drop-shadow-sm"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <option
            disabled={true}
            style={{
              paddingTop: "5px",
              paddingBottom: "5px",
              marginBottom: "5px",
            }}
          >
            Pilih tipe cipher
          </option>
          <option
            className="hover:bg-[#F2F9EE] hover:text-[#5F9F35] transition-colors"
            style={{
              paddingTop: "5px",
              paddingBottom: "5px",
              marginBottom: "5px",
            }}
            value="enigma"
          >
            Enigma
          </option>
          {CIPHER_TYPES.filter((cipher) => cipher.value !== "enigma").map(
            (cipher, i) => (
              <option
                key={cipher.value}
                className="hover:bg-[#F2F9EE] hover:text-[#5F9F35] transition-colors"
                style={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  marginBottom: `${i !== CIPHER_TYPES.length - 2 ? "5px" : "0px"}`,
                }}
                value={cipher.value}
              >
                {cipher.name}
              </option>
            ),
          )}
        </select>
      </div>

      {([0, 1, 2] as const).map((i) => (
        <div key={i} className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm text-[#848484] font-medium mb-1">
              {rotorLabels[i]}
            </label>
            <select
              className="select select-[#BABABA] outline-none rounded-lg cursor-pointer drop-shadow-sm w-full"
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
              value={rotors[i]}
              onChange={(e) => setRotor(i, e.target.value as RotorName)}
            >
              {ROTOR_NAMES.map((n) => (
                <option
                  key={n}
                  className="hover:bg-[#F2F9EE] hover:text-[#5F9F35] transition-colors"
                >
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-[#848484] font-medium mb-1">
              Position
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1.5">
              <button
                onClick={() => setPos(i, positions[i] - 1)}
                className="text-gray-400 hover:text-gray-700 px-1 cursor-pointer"
              >
                −
              </button>
              <span className="flex-1 text-center text-sm font-mono cursor-pointer">
                {positions[i] + 1} {ALPHABET[positions[i]]}
              </span>
              <button
                onClick={() => setPos(i, positions[i] + 1)}
                className="text-gray-400 hover:text-gray-700 px-1 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#848484] font-medium mb-1">
              Ring
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1.5">
              <button
                onClick={() => setRing(i, rings[i] - 1)}
                className="text-gray-400 hover:text-gray-700 px-1 cursor-pointer"
              >
                −
              </button>
              <span className="flex-1 text-center text-sm font-mono">
                {rings[i] + 1} {ALPHABET[rings[i]]}
              </span>
              <button
                onClick={() => setRing(i, rings[i] + 1)}
                className="text-gray-400 hover:text-gray-700 px-1 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div>
        <label
          className="block text-sm text-[#848484] font-medium mb-1"
          style={{ marginBottom: "5px" }}
        >
          {mode === "encrypt" ? "Plaintext" : "Ciphertext"}
        </label>
        <textarea
          rows={7}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#58B509] transition-all placeholder:text-[#B6B6B6] drop-shadow-sm"
          style={{ padding: "10px" }}
          placeholder={`Masukkan ${mode === "encrypt" ? "plaintext" : "ciphertext"} disini`}
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

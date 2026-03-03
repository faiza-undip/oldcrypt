"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CipherLayout from "@/components/ui/CipherLayout";

import {
  playfairEncrypt,
  playfairDecrypt,
  buildPlayfairSquare,
} from "@/lib/ciphers/playfair";
import { CIPHER_TYPES } from "@/constants/cipherTypes";

export default function PlayfairCipher() {
  const router = useRouter();

  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [key, setKey] = useState("Gravity Falls");
  const [text, setText] = useState("Attack at dawn");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleProcess = () => {
    const trimmedKey = key.trim();
    const trimmedText = text.trim();

    // Key validations
    if (!trimmedKey) {
      setError("Key tidak boleh kosong.");
      return;
    }
    // Playfair biasanya butuh setidaknya 1 huruf untuk bangun square
    if (!/[a-zA-Z]/.test(trimmedKey)) {
      setError("Key harus mengandung minimal 1 huruf (A-Z).");
      return;
    }

    // Text validations
    if (!trimmedText) {
      setError(
        `Input ${mode === "encrypt" ? "plaintext" : "ciphertext"} tidak boleh kosong.`,
      );
      return;
    }
    // Minimal ada huruf supaya proses Playfair meaningful
    if (!/[a-zA-Z]/.test(trimmedText)) {
      setError(
        `${mode === "encrypt" ? "Plaintext" : "Ciphertext"} harus mengandung minimal 1 huruf (A-Z).`,
      );
      return;
    }

    setError("");
    setOutput(
      mode === "encrypt"
        ? playfairEncrypt(text, trimmedKey)
        : playfairDecrypt(text, trimmedKey),
    );
  };

  // Tetap build square dari key (agar UI hidup), tapi pakai trimmed supaya lebih stabil
  const square = buildPlayfairSquare(key.trim());

  return (
    <CipherLayout
      title="Playfair Cipher"
      mode={mode}
      onModeChange={(m) => {
        setMode(m);
        setOutput("");
        setError("");
      }}
      output={output}
      extra={
        <div>
          <p className="text-sm text-[#6D6D6D] mb-3 text-center font-medium">
            Playfair Square
          </p>
          <div className="w-full flex items-center justify-center">
            <div className="border-l border-r border-black px-3">
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
        </div>
      }
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
          defaultValue="playfair"
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
            value="playfair"
          >
            Playfair
          </option>
          {CIPHER_TYPES.filter((cipher) => cipher.value !== "playfair").map(
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

      <div>
        <label
          className="block text-sm text-[#848484] font-medium"
          style={{ marginBottom: "5px" }}
        >
          Key
        </label>
        <input
          className="w-full border border-[#BABABA] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#58B509] drop-shadow-sm"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

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
          className="w-full border border-[#BABABA] rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#58B509] transition-all placeholder:text-[#B6B6B6] drop-shadow-sm"
          style={{ padding: "10px" }}
          placeholder={`Masukkan ${mode === "encrypt" ? "plaintext" : "ciphertext"} disini`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        onClick={handleProcess}
        className="w-full bg-[#58B509] hover:bg-[#51A608] text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
      >
        {mode === "encrypt" ? "Enkode" : "Dekode"}
      </button>
    </CipherLayout>
  );
}

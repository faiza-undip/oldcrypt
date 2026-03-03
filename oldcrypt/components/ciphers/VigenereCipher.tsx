"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CipherLayout from "@/components/ui/CipherLayout";

import { vigenereEncrypt, vigenereDecrypt } from "@/lib/ciphers/vignere";
import { CIPHER_TYPES } from "@/constants/cipherTypes";

export default function VigenereCipher() {
  const router = useRouter();

  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [key, setKey] = useState("cryptii");
  const [text, setText] = useState("You had me at hello");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleProcess = () => {
    const trimmedKey = key.trim();

    if (!trimmedKey) {
      setError("Key tidak boleh kosong.");
      return;
    }

    // Minimal harus ada huruf (A-Z). Ini mengikuti UX umum Vigenere key.
    if (!/[a-zA-Z]/.test(trimmedKey)) {
      setError("Key harus mengandung minimal 1 huruf (A-Z).");
      return;
    }

    setError("");
    setOutput(
      mode === "encrypt"
        ? vigenereEncrypt(text, trimmedKey)
        : vigenereDecrypt(text, trimmedKey),
    );
  };

  return (
    <CipherLayout
      title="Vigenere Cipher Standard (26 Alphabets)"
      mode={mode}
      onModeChange={(m) => {
        setMode(m);
        setOutput("");
        setError("");
      }}
      output={output}
    >
      {/* Cipher type selector */}
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
          defaultValue="vigenere"
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
            value="vigenere"
          >
            Vigenere
          </option>
          {CIPHER_TYPES.filter((cipher) => cipher.value !== "vigenere").map(
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
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#58B509] drop-shadow-sm"
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
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#58B509] transition-all placeholder:text-[#B6B6B6] drop-shadow-sm"
          style={{ padding: "10px" }}
          placeholder={`Masukkan ${mode === "encrypt" ? "plaintext" : "ciphertext"} disini`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        onClick={handleProcess}
        className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
      >
        {mode === "encrypt" ? "Enkode" : "Dekode"}
      </button>
    </CipherLayout>
  );
}

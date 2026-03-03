"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CipherLayout from "@/components/ui/CipherLayout";

import { hillEncrypt, hillDecrypt, isValidHillKey } from "@/lib/ciphers/hill";
import { CIPHER_TYPES } from "@/constants/cipherTypes";

export default function HillCipher() {
  const router = useRouter();

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
          defaultValue="hill"
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
            value="hill"
          >
            Hill
          </option>
          {CIPHER_TYPES.filter((cipher) => cipher.value !== "hill").map(
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

      {/* Matrix wrapper + left/right lines */}
      <div className="w-full flex justify-center md:justify-start">
        <div className="md:max-w-1/2 relative py-3">
          <div
            className="pointer-events-none absolute left-0 top-0 h-full"
            style={{ width: "1px", backgroundColor: "#9CA3AF" }} // gray-400-ish
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full"
            style={{ width: "1px", backgroundColor: "#9CA3AF" }}
          />

          <div className="border border-gray-100 rounded-xl p-4 grid grid-cols-2 gap-4">
            {cells.map(([r, c], i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-[#848484] font-medium w-20">
                  {labels[i]}
                </span>
                <input
                  type="number"
                  className="w-16 border border-[#BABABA] rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:border-[#58B509] transition-all drop-shadow-sm"
                  value={matrix[r][c]}
                  onChange={(e) => setCell(r, c, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        onClick={handleProcess}
        className="w-full bg-[#58B509] hover:bg-[#51A608] text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
      >
        {mode === "encrypt" ? "Enkode" : "Dekode"}
      </button>
    </CipherLayout>
  );
}

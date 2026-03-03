"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RangeSlider from "react-bootstrap-range-slider";

import CipherLayout from "@/components/ui/CipherLayout";

import { affineEncrypt, affineDecrypt, isValidA } from "@/lib/ciphers/affine";
import { CIPHER_TYPES } from "@/constants/cipherTypes";

export default function AffineCipher() {
  const router = useRouter();

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
          defaultValue="affine"
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
            value="affine"
          >
            Affine
          </option>
          {CIPHER_TYPES.filter((cipher) => cipher.value !== "affine").map(
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

      <div className="grid grid-cols-2">
        <div>
          <label
            className="block text-sm text-[#848484] font-medium"
            style={{ marginBottom: "5px" }}
          >
            Slope / A
          </label>
          <div className="w-full flex flex-row space-x-5 items-center">
            <RangeSlider
              min={1}
              max={25}
              value={a}
              onChange={(e) =>
                setA(Number((e.target as HTMLInputElement).value))
              }
              tooltip="on"
              tooltipLabel={(val) => `${val}`}
              variant="success"
            />

            <div className="mt-2 border border-gray-200 rounded-lg px-3 py-3 text-sm text-center w-10 h-10 flex items-center drop-shadow-sm">
              {a}
            </div>
          </div>
        </div>

        <div>
          <label
            className="block text-sm text-[#848484] font-medium"
            style={{ marginBottom: "5px" }}
          >
            Intercept / B
          </label>
          <div className="w-full flex flex-row space-x-5 items-center">
            <RangeSlider
              min={0}
              max={25}
              value={b}
              onChange={(e) =>
                setB(Number((e.target as HTMLInputElement).value))
              }
              tooltip="on"
              tooltipLabel={(val) => `${val}`}
              variant="success"
            />

            <div className="mt-2 border border-gray-200 rounded-lg px-3 py-3 text-sm text-center w-10 h-10 flex items-center drop-shadow-sm">
              {b}
            </div>
          </div>
        </div>
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
        className="w-full bg-[#58B509] hover:bg-[#51A608] cursor-pointer text-white font-bold rounded-lg transition-colors"
        style={{ padding: "10px" }}
      >
        {mode === "encrypt" ? "Enkode" : "Dekode"}
      </button>
    </CipherLayout>
  );
}

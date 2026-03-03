import VigenereCipher from "@/components/ciphers/VigenereCipher";
import AffineCipher from "@/components/ciphers/AffineCipher";
import PlayfairCipher from "@/components/ciphers/PlayfairCipher";
import HillCipher from "@/components/ciphers/HillCipher";
import EnigmaCipher from "@/components/ciphers/EnigmaCipher";

const cipherMap: Record<string, React.ComponentType> = {
  vigenere: VigenereCipher,
  affine: AffineCipher,
  playfair: PlayfairCipher,
  hill: HillCipher,
  enigma: EnigmaCipher,
};

export default async function CipherPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const Component = cipherMap[type];
  if (!Component)
    return <div className="p-8 text-red-500">Cipher tidak ditemukan</div>;
  return <Component />;
}

export function generateStaticParams() {
  return Object.keys(cipherMap).map((type) => ({ type }));
}

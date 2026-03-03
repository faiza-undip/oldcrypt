export function vigenereEncrypt(plaintext: string, key: string): string {
  const k = key.toLowerCase().replace(/[^a-z]/g, "");
  if (!k) return plaintext;
  let result = "";
  let ki = 0;
  for (const ch of plaintext) {
    if (/[a-zA-Z]/.test(ch)) {
      const base = ch >= "a" ? 97 : 65;
      const shift = k[ki % k.length].charCodeAt(0) - 97;
      result += String.fromCharCode(
        ((ch.charCodeAt(0) - base + shift) % 26) + base,
      );
      ki++;
    } else {
      result += ch;
    }
  }
  return result;
}

export function vigenereDecrypt(ciphertext: string, key: string): string {
  const k = key.toLowerCase().replace(/[^a-z]/g, "");
  if (!k) return ciphertext;
  let result = "";
  let ki = 0;
  for (const ch of ciphertext) {
    if (/[a-zA-Z]/.test(ch)) {
      const base = ch >= "a" ? 97 : 65;
      const shift = k[ki % k.length].charCodeAt(0) - 97;
      result += String.fromCharCode(
        ((ch.charCodeAt(0) - base - shift + 26) % 26) + base,
      );
      ki++;
    } else {
      result += ch;
    }
  }
  return result;
}

export function vigenereEncrypt(plaintext: string, key: string): string {
  if (!key) return '';
  const k = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!k) return '';
  let result = '';
  let keyIndex = 0;
  for (const ch of plaintext) {
    if (/[a-zA-Z]/.test(ch)) {
      const isUpper = ch === ch.toUpperCase();
      const base = isUpper ? 65 : 97;
      const shift = k.charCodeAt(keyIndex % k.length) - 65;
      result += String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26) + base);
      keyIndex++;
    } else {
      result += ch;
    }
  }
  return result;
}

export function vigenereDecrypt(ciphertext: string, key: string): string {
  if (!key) return '';
  const k = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!k) return '';
  let result = '';
  let keyIndex = 0;
  for (const ch of ciphertext) {
    if (/[a-zA-Z]/.test(ch)) {
      const isUpper = ch === ch.toUpperCase();
      const base = isUpper ? 65 : 97;
      const shift = k.charCodeAt(keyIndex % k.length) - 65;
      result += String.fromCharCode(((ch.charCodeAt(0) - base - shift + 26) % 26) + base);
      keyIndex++;
    } else {
      result += ch;
    }
  }
  return result;
}
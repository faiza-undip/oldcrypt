function modInverse(a: number, m: number): number {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error(`No modular inverse for a=${a}`);
}

export function affineEncrypt(plaintext: string, a: number, b: number): string {
  return plaintext
    .split("")
    .map((ch) => {
      if (/[a-zA-Z]/.test(ch)) {
        const base = ch >= "a" ? 97 : 65;
        const x = ch.charCodeAt(0) - base;
        return String.fromCharCode(((a * x + b) % 26) + base);
      }
      return ch;
    })
    .join("");
}

export function affineDecrypt(
  ciphertext: string,
  a: number,
  b: number,
): string {
  const aInv = modInverse(a, 26);
  return ciphertext
    .split("")
    .map((ch) => {
      if (/[a-zA-Z]/.test(ch)) {
        const base = ch >= "a" ? 97 : 65;
        const y = ch.charCodeAt(0) - base;
        return String.fromCharCode(((aInv * (y - b + 26)) % 26) + base);
      }
      return ch;
    })
    .join("");
}

export function isValidA(a: number): boolean {
  const validAs = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
  return validAs.includes(a);
}

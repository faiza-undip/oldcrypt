function modInverse(a: number, m: number): number {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error(`No modular inverse for a=${a}, m=${m}`);
}

export function affineEncrypt(plaintext: string, a: number, b: number): string {
  let result = '';
  for (const ch of plaintext) {
    if (/[a-zA-Z]/.test(ch)) {
      const isUpper = ch === ch.toUpperCase();
      const base = isUpper ? 65 : 97;
      const x = ch.charCodeAt(0) - base;
      result += String.fromCharCode(((a * x + b) % 26) + base);
    } else {
      result += ch;
    }
  }
  return result;
}

export function affineDecrypt(ciphertext: string, a: number, b: number): string {
  const aInv = modInverse(a, 26);
  let result = '';
  for (const ch of ciphertext) {
    if (/[a-zA-Z]/.test(ch)) {
      const isUpper = ch === ch.toUpperCase();
      const base = isUpper ? 65 : 97;
      const y = ch.charCodeAt(0) - base;
      result += String.fromCharCode((aInv * (y - b + 26) % 26) + base);
    } else {
      result += ch;
    }
  }
  return result;
}

export function isValidAffineA(a: number): boolean {
  const validA = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
  return validA.includes(a);
}
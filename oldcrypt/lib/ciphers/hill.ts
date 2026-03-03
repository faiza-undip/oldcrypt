function matMul(a: number[][], b: number[][], mod: number): number[][] {
  const n = a.length;
  const result = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      for (let k = 0; k < n; k++)
        result[i][j] = (result[i][j] + a[i][k] * b[k][j]) % mod;
  return result;
}

function det2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++)
    if ((a * x) % m === 1) return x;
  throw new Error('No modular inverse');
}

function invertMatrix2x2(m: number[][]): number[][] {
  const d = ((det2(m) % 26) + 26) % 26;
  const dInv = modInverse(d, 26);
  return [
    [(dInv * m[1][1] % 26 + 26) % 26, ((-dInv * m[0][1]) % 26 + 26) % 26],
    [((-dInv * m[1][0]) % 26 + 26) % 26, (dInv * m[0][0] % 26 + 26) % 26],
  ];
}

export function hillEncrypt(plaintext: string, keyMatrix: number[][]): string {
  const text = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  const padded = text.length % 2 !== 0 ? text + 'X' : text;
  let result = '';
  for (let i = 0; i < padded.length; i += 2) {
    const vec = [[padded.charCodeAt(i) - 65], [padded.charCodeAt(i + 1) - 65]];
    const enc = matMul(keyMatrix, vec, 26);
    result += String.fromCharCode(enc[0][0] + 65) + String.fromCharCode(enc[1][0] + 65);
  }
  return result.toLowerCase();
}

export function hillDecrypt(ciphertext: string, keyMatrix: number[][]): string {
  const text = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  const inv = invertMatrix2x2(keyMatrix);
  let result = '';
  for (let i = 0; i < text.length; i += 2) {
    if (i + 1 >= text.length) break;
    const vec = [[text.charCodeAt(i) - 65], [text.charCodeAt(i + 1) - 65]];
    const dec = matMul(inv, vec, 26);
    result += String.fromCharCode(dec[0][0] + 65) + String.fromCharCode(dec[1][0] + 65);
  }
  return result.toLowerCase();
}

export function isInvertible(m: number[][]): boolean {
  try {
    const d = ((det2(m) % 26) + 26) % 26;
    modInverse(d, 26);
    return true;
  } catch {
    return false;
  }
}
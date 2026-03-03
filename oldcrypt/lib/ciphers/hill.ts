function matMul(a: number[][], b: number[][], mod: number): number[][] {
  const n = a.length;
  return a.map((row, i) =>
    b[0].map((_, j) =>
      row.reduce((sum, _, k) => (sum + a[i][k] * b[k][j]) % mod, 0),
    ),
  );
}

function det2x2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
  throw new Error("No inverse");
}

function invertMatrix2x2(m: number[][], mod: number): number[][] {
  const det = ((det2x2(m) % mod) + mod) % mod;
  const detInv = modInverse(det, mod);
  return [
    [
      (((m[1][1] * detInv) % mod) + mod) % mod,
      (((-m[0][1] * detInv) % mod) + mod) % mod,
    ],
    [
      (((-m[1][0] * detInv) % mod) + mod) % mod,
      (((m[0][0] * detInv) % mod) + mod) % mod,
    ],
  ];
}

export function hillEncrypt(plaintext: string, keyMatrix: number[][]): string {
  const text = plaintext.toUpperCase().replace(/[^A-Z]/g, "");
  const padded = text.length % 2 !== 0 ? text + "X" : text;
  let result = "";
  for (let i = 0; i < padded.length; i += 2) {
    const vec = [[padded.charCodeAt(i) - 65], [padded.charCodeAt(i + 1) - 65]];
    const enc = matMul(keyMatrix, vec, 26);
    result +=
      String.fromCharCode(enc[0][0] + 65) + String.fromCharCode(enc[1][0] + 65);
  }
  return result.toLowerCase();
}

export function hillDecrypt(ciphertext: string, keyMatrix: number[][]): string {
  const text = ciphertext.toUpperCase().replace(/[^A-Z]/g, "");
  const inv = invertMatrix2x2(keyMatrix, 26);
  let result = "";
  for (let i = 0; i < text.length; i += 2) {
    const vec = [[text.charCodeAt(i) - 65], [text.charCodeAt(i + 1) - 65]];
    const dec = matMul(inv, vec, 26);
    result +=
      String.fromCharCode(dec[0][0] + 65) + String.fromCharCode(dec[1][0] + 65);
  }
  return result.toLowerCase();
}

export function isValidHillKey(m: number[][]): boolean {
  try {
    const det = ((det2x2(m) % 26) + 26) % 26;
    modInverse(det, 26);
    return true;
  } catch {
    return false;
  }
}

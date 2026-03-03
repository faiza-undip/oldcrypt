export function buildPlayfairSquare(key: string): string[][] {
  const cleaned = key
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .replace(/J/g, "I");
  const seen = new Set<string>();
  const chars: string[] = [];
  for (const ch of cleaned + "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
    if (!seen.has(ch)) {
      seen.add(ch);
      chars.push(ch);
    }
  }
  const grid: string[][] = [];
  for (let i = 0; i < 5; i++) grid.push(chars.slice(i * 5, i * 5 + 5));
  return grid;
}

function findPos(grid: string[][], ch: string): [number, number] {
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++) if (grid[r][c] === ch) return [r, c];
  return [-1, -1];
}

function prepareText(text: string): string[] {
  const upper = text
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .replace(/J/g, "I");
  const pairs: string[] = [];
  let i = 0;
  while (i < upper.length) {
    const a = upper[i];
    const b = i + 1 < upper.length ? upper[i + 1] : "X";
    if (a === b) {
      pairs.push(a + "X");
      i++;
    } else {
      pairs.push(a + b);
      i += 2;
    }
  }
  if (pairs.length > 0) {
    const last = pairs[pairs.length - 1];
    if (last.length === 1) pairs[pairs.length - 1] = last + "X";
  }
  return pairs;
}

export function playfairEncrypt(plaintext: string, key: string): string {
  const grid = buildPlayfairSquare(key);
  const pairs = prepareText(plaintext);
  return pairs
    .map(([a, b]) => {
      const [r1, c1] = findPos(grid, a);
      const [r2, c2] = findPos(grid, b);
      if (r1 === r2) return grid[r1][(c1 + 1) % 5] + grid[r2][(c2 + 1) % 5];
      if (c1 === c2) return grid[(r1 + 1) % 5][c1] + grid[(r2 + 1) % 5][c2];
      return grid[r1][c2] + grid[r2][c1];
    })
    .join("");
}

export function playfairDecrypt(ciphertext: string, key: string): string {
  const grid = buildPlayfairSquare(key);
  const upper = ciphertext.toUpperCase().replace(/[^A-Z]/g, "");
  const pairs: [string, string][] = [];
  for (let i = 0; i < upper.length; i += 2)
    pairs.push([upper[i], upper[i + 1] ?? "X"]);
  return pairs
    .map(([a, b]) => {
      const [r1, c1] = findPos(grid, a);
      const [r2, c2] = findPos(grid, b);
      if (r1 === r2) return grid[r1][(c1 + 4) % 5] + grid[r2][(c2 + 4) % 5];
      if (c1 === c2) return grid[(r1 + 4) % 5][c1] + grid[(r2 + 4) % 5][c2];
      return grid[r1][c2] + grid[r2][c1];
    })
    .join("");
}

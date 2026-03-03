export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function cleanText(text: string): string {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
}

// Simplified Enigma with 3 rotors (I, II, III), reflector B
const ROTORS: Record<string, { wiring: string; notch: string }> = {
  I: { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" },
  II: { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E" },
  III: { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V" },
};
const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function rotorForward(
  wiring: string,
  pos: number,
  ring: number,
  ch: string,
): string {
  const idx = (ALPHABET.indexOf(ch) + pos - ring + 26) % 26;
  const out = wiring[idx];
  return ALPHABET[(ALPHABET.indexOf(out) - pos + ring + 26) % 26];
}

function rotorBackward(
  wiring: string,
  pos: number,
  ring: number,
  ch: string,
): string {
  const idx = (ALPHABET.indexOf(ch) + pos - ring + 26) % 26;
  const out = ALPHABET[wiring.indexOf(ALPHABET[idx])];
  return ALPHABET[(ALPHABET.indexOf(out) - pos + ring + 26) % 26];
}

export interface EnigmaConfig {
  rotors: [string, string, string];
  positions: [number, number, number];
  rings: [number, number, number];
}

export function enigmaProcess(text: string, config: EnigmaConfig): string {
  const { rotors, positions, rings } = config;
  const pos = [...positions] as [number, number, number];
  const r = rotors.map((name) => ROTORS[name]);
  let result = "";

  for (const ch of text.toUpperCase()) {
    if (!/[A-Z]/.test(ch)) {
      result += ch.toLowerCase();
      continue;
    }

    // Stepping
    const atNotch1 = ALPHABET[pos[1]] === r[1].notch;
    const atNotch0 = ALPHABET[pos[0]] === r[0].notch;
    if (atNotch1) {
      pos[2] = (pos[2] + 1) % 26;
      pos[1] = (pos[1] + 1) % 26;
    } else if (atNotch0) {
      pos[1] = (pos[1] + 1) % 26;
    }
    pos[0] = (pos[0] + 1) % 26;

    // Forward through rotors
    let c = ch;
    c = rotorForward(r[0].wiring, pos[0], rings[0], c);
    c = rotorForward(r[1].wiring, pos[1], rings[1], c);
    c = rotorForward(r[2].wiring, pos[2], rings[2], c);
    // Reflector
    c = REFLECTOR_B[ALPHABET.indexOf(c)];
    // Backward
    c = rotorBackward(r[2].wiring, pos[2], rings[2], c);
    c = rotorBackward(r[1].wiring, pos[1], rings[1], c);
    c = rotorBackward(r[0].wiring, pos[0], rings[0], c);

    result += c.toLowerCase();
  }
  return result;
}

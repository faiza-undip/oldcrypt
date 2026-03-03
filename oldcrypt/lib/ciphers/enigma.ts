// Simplified Enigma (3 rotors, reflector B, no plugboard for simplicity)
const ROTORS: Record<string, { wiring: string; notch: string }> = {
  I: { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" },
  II: { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E" },
  III: { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V" },
  IV: { wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: "J" },
  V: { wiring: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: "Z" },
};

const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

function rotorForward(
  wiring: string,
  letter: number,
  offset: number,
  ring: number,
): number {
  const idx = (letter + offset - ring + 26) % 26;
  const out = wiring.charCodeAt(idx) - 65;
  return (out - offset + ring + 26) % 26;
}

function rotorBackward(
  wiring: string,
  letter: number,
  offset: number,
  ring: number,
): number {
  const shifted = (letter + offset - ring + 26) % 26;
  const out = wiring.indexOf(String.fromCharCode(shifted + 65));
  return (out - offset + ring + 26) % 26;
}

export interface EnigmaConfig {
  rotors: [string, string, string]; // rotor names
  positions: [number, number, number]; // 1-based
  rings: [number, number, number]; // 1-based
}

export function enigmaProcess(text: string, config: EnigmaConfig): string {
  const r = config.rotors.map((name) => ROTORS[name]);
  const pos = config.positions.map((p) => p - 1) as [number, number, number];
  const ring = config.rings.map((r) => r - 1) as [number, number, number];

  let result = "";
  for (const ch of text) {
    if (!/[a-zA-Z]/.test(ch)) {
      result += ch;
      continue;
    }

    // Step rotors
    const atNotch2 = pos[1] === r[1].notch.charCodeAt(0) - 65;
    const atNotch1 = pos[0] === r[0].notch.charCodeAt(0) - 65;
    if (atNotch2) {
      pos[1] = (pos[1] + 1) % 26;
      pos[2] = (pos[2] + 1) % 26;
    } else if (atNotch1) pos[1] = (pos[1] + 1) % 26;
    pos[0] = (pos[0] + 1) % 26;

    let c = ch.toUpperCase().charCodeAt(0) - 65;
    // Forward through rotors I -> II -> III
    c = rotorForward(r[0].wiring, c, pos[0], ring[0]);
    c = rotorForward(r[1].wiring, c, pos[1], ring[1]);
    c = rotorForward(r[2].wiring, c, pos[2], ring[2]);
    // Reflector
    c = REFLECTOR_B.charCodeAt(c) - 65;
    // Backward III -> II -> I
    c = rotorBackward(r[2].wiring, c, pos[2], ring[2]);
    c = rotorBackward(r[1].wiring, c, pos[1], ring[1]);
    c = rotorBackward(r[0].wiring, c, pos[0], ring[0]);

    result +=
      ch === ch.toUpperCase()
        ? String.fromCharCode(c + 65)
        : String.fromCharCode(c + 97);
  }
  return result;
}

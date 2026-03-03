import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OldCrypt",
  description: "Classical Cipher Encryption & Decryption",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

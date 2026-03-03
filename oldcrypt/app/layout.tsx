import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "OldCrypt",
  description: "Implementasi kriptografi klasik berbasis web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

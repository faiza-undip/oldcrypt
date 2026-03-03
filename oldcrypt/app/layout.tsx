import type { Metadata } from "next";
import { DM_Sans, Playfair } from "next/font/google";

import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import "./globals.css";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const playfair = Playfair({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "OldCrypt",
  description: "Implementasi kriptografi klasik berbasis web",
  icons: {
    icon: "/oldcrypt-logo.png",
    shortcut: "/oldcrypt-logo.png",
    apple: "/oldcrypt-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${dmSans.className} ${playfair.className}`}>
        {children}
      </body>
    </html>
  );
}

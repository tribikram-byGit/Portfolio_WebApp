import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["opsz"] });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Tribikram Purkayastha | Full-Stack Developer",
  description: "Portfolio of Tribikram Purkayastha: React, Next.js, Node.js and FastAPI projects, told as case files.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}

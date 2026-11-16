import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "portafolio.txt",
  description: "Portfolio de desarrollo web y creativo con experiencia visual 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} antialiased dark`}
    >
      <body className="bg-black text-[#f4f4f6] selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Ashes & Ember — Interactive Story",
  description: "A cinematic interactive storytelling site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0c0802] text-[#f4e8d0]`}
      >
        {/* You can add global components here if needed */}
        {children}
      </body>
    </html>
  );
}
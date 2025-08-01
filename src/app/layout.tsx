import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "TissueProID - Laboratory Products",
  description: "High-quality laboratory products and equipment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          geistSans.className +
          " bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-black dark:to-gray-900 min-h-screen"
        }
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

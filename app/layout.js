import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from 'react-hot-toast';
import { QueryProvider } from "@/components/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextJs Learnings",
  description: "Journey of learning NextJs from Udemy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Toaster></Toaster>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

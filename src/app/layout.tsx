import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lean Six Sigma Academy — Green & Black Belt Complete Course",
  description: "Interactive learning platform for Lean Six Sigma Green Belt and Black Belt certification. Covers DMAIC methodology, statistical tools, DOE, Lean tools, and DFSS. Aligned with ASQ & IASSC Body of Knowledge.",
  keywords: ["Lean Six Sigma", "Green Belt", "Black Belt", "DMAIC", "Six Sigma Certification", "ASQ", "IASSC", "SPC", "DOE", "Process Improvement"],
  authors: [{ name: "LSS Academy" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
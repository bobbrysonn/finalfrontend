import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Layup List",
  description: "Course review website for dartmouth students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased h-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <Header />
          {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

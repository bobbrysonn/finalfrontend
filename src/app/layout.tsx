import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { ActivationEmailStoreProvider } from "@/providers/activationemail-store-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Based Reviews",
  description: "Based course reviews for dartmouth students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} antialiased h-full bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ActivationEmailStoreProvider>
            <Header />
            {children}
            <Toaster />
          </ActivationEmailStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

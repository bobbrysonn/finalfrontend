import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "Based Reviews",
  authors: { name: "Bob Moriasi", url: "https://bobbrysonn.dev" },
  creator: "Bob Moriasi",
  description: "Based course reviews for dartmouth students",
  keywords: [
    "Based",
    "Based Reviews",
    "Course",
    "Course Reviews",
    "Dartmouth",
    "Dartmouth Based Reviews",
    "Dartmouth College",
    "Dartmouth Course Reviews",
    "Layup",
    "Layup Course Reviews",
    "Layup Dartmouth",
    "Layup List",
    "Rankings",
    "Ratings",
    "Reviews",
  ],
  openGraph: {
    description: "Based course reviews for dartmouth students",
    images: [
      {
        url: "https://basedreviews.info/images/brand-body.png",
        alt: "Based Reviews",
      },
    ],
    locale: "en_US",
    siteName: "Based Reviews",
    title: "Based Reviews | Dartmouth's Based Course Reviews",
    type: "website",
    url: "https://basedreviews.info",
  },
  referrer: "origin",
  robots: "index, follow",
  title: "Based Reviews | Dartmouth's Based Course Reviews",
  twitter: {
    card: "summary_large_image",
    creator: "@iamyourtoph",
    description: "Based course reviews for dartmouth students",
    images: [
      {
        alt: "Moai stones",
        url: "https://basedreviews.info/images/brand-body.png",
      },
    ],
    site: "@iamyourtoph",
    title: "Based Reviews | Dartmouth's Based Course Reviews",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} antialiased h-full bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-5BSXD7T6J2" />
      </body>
    </html>
  );
}

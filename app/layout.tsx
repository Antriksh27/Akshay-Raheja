import type { Metadata } from "next";
import { Anton, Space_Mono, Inter, Geist } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { cn } from "@/lib/utils";
import { GlobalPlayerProvider } from "@/components/providers/GlobalPlayerProvider";
import { StickyMiniPlayer } from "@/components/ui/StickyMiniPlayer";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akshay Raheja | Composer & Producer",
  description: "Portfolio of Bollywood composer and producer Akshay Raheja, also known as Akshay & IP.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", anton.variable, spaceMono.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col relative bg-bg-base text-text-primary">
        <GlobalPlayerProvider>
          <GrainOverlay />
          {children}
          <StickyMiniPlayer />
        </GlobalPlayerProvider>
      </body>
    </html>
  );
}

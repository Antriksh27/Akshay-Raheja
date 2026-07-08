import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { cn } from "@/lib/utils";
import { GlobalPlayerProvider } from "@/components/providers/GlobalPlayerProvider";
import { StickyMiniPlayer } from "@/components/ui/StickyMiniPlayer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Akshay Raheja",
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
      className={cn("h-full", "antialiased", bricolage.variable, spaceMono.variable, instrumentSerif.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col relative bg-bg-base text-text-primary">
        <CustomCursor />
        <GlobalPlayerProvider>
          <GrainOverlay />
          {children}
          <StickyMiniPlayer />
        </GlobalPlayerProvider>
      </body>
    </html>
  );
}

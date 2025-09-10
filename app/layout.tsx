import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: "PearlPerfect V34 Whitening Strips – Whiter teeth in 14 minutes",
  description: "Enamel‑safe whitening strips with zero sensitivity. Clinically backed results you can see from the first use.",
  keywords: "teeth whitening, whitening strips, dental care, enamel safe, sensitivity free",
  openGraph: {
    title: "PearlPerfect V34 Whitening Strips – Whiter teeth in 14 minutes",
    description: "Enamel‑safe whitening strips with zero sensitivity. Clinically backed results you can see from the first use.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PearlPerfect V34 Whitening Strips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PearlPerfect V34 Whitening Strips – Whiter teeth in 14 minutes",
    description: "Enamel‑safe whitening strips with zero sensitivity. Clinically backed results you can see from the first use.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {/* Gooey blob SVG filter */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
              <feColorMatrix in="blur" mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
              <feBlend in="SourceGraphic" in2="goo"/>
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}

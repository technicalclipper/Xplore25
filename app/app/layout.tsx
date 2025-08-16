import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";


const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start-2p",
});




export const metadata: Metadata = {
  title: "Xplore25",
  description: "Xplore25",
  openGraph: {
    title: "Xplore25",
    description: "Xplore25 - Department of CSE Events",
    images: [
      {
        url: "/assets/licet.png",
        width: 1200,
        height: 630,
        alt: "LICET Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xplore25",
    description: "Xplore25 - Department of CSE Events",
    images: ["/assets/licet.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}


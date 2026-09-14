import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bitter, Roboto } from "next/font/google";
import "./globals.css";

const metropolis = localFont({
  src: [
    { path: "../fonts/Metropolis-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Metropolis-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Metropolis-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Metropolis-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-metropolis",
  display: "swap",
});

const bitter = Bitter({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-bitter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWS GenAI Roadshow | CloudKeeper",
  description:
    "A hands-on GenAI workshop for technical founders and engineering teams taking AI to production. Hosted by AWS and CloudKeeper.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${metropolis.variable} ${bitter.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className={`${metropolis.className} min-h-full bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}

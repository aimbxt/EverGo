import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EverGo — Help seniors keep going",
  description:
    "Discover activities, share a Senior Bus, and keep families in the loop.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

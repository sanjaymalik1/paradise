import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OYO: India's Best Hotel Booking Site For Sanitized Stay",
  description: "Book hotels with OYO and get the best deals on 174,000+ hotels and homes across 35+ countries. Enjoy free cancellation and pay at hotel options!",
  keywords: "OYO, hotels, booking, accommodation, travel, India hotels, budget hotels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-white`}
      >
        

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>


      </body>
    </html>
  );
}

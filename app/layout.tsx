import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { NavbarTop } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DevOps Career",
  description: "Master Your DevOps Career",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className={`${geist.variable} ${geistMono.variable} ${poppins.className} min-h-screen bg-[white/80]`}>
        <div className="fixed top-4 left-0 right-0 z-50">
          <NavbarTop />
        </div>
        <main className="w-full min-h-screen">
          <div className="w-full max-w-[2000px] mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

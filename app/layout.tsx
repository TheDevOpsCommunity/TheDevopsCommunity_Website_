import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { NavbarTop } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next"

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
  title: "DevOps Community",
  description: "Master Your DevOps Career",
  icons: {
    icon: '/dc_logo.svg',
  },
  openGraph: {
    title: "DevOps Community",
    description: "Master Your DevOps Career",
    siteName: "DevOps Community",
    locale: "en_US",
    type: "website",
    url: "https://devops-community.com",
    images: [
      {
        url: "/dc_logo.svg",
        width: 128,
        height: 128,
        alt: "DevOps Community Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@devops-community",
    creator: "@devops-community",
    title: "DevOps Community",
    description: "Master Your DevOps Career",
    images: ["/dc_logo.svg"],
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
        <Analytics />
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

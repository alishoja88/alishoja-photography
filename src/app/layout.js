import "./globals.css";
import { Montserrat } from "next/font/google";
import ClientLayout from "@/component/clientLayout/ClientLayout";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Ali Shoja | Professional Photographer",
    template: "%s | Ali Shoja Photography",
  },
  description: "Professional photographer specializing in street and nature photography.",
  keywords: ["photography", "street photography", "nature photography"],
  robots: { 
    index: true, 
    follow: true 
  },
  openGraph: {
    title: "Ali Shoja Photography",
    description: "Capturing life's moments.",
    type: "website",
    siteName: "Ali Shoja Photography",
    locale: "en_US",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Shoja Photography",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="antialiased font-montserrat bg-black w-full pt-20">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
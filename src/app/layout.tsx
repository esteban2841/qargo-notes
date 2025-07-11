import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QargoCoffeeProvider } from '../context'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Qargo Notes",
  description: "Application to manage notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  relative w-full  antialiased`}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full h-full">

          <QargoCoffeeProvider>

            {children}
          </QargoCoffeeProvider>
        </div>
      </body>
    </html>
  );
}

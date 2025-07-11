import { QargoCoffeeProvider } from "@/context";
import type { Metadata } from "next";
import { NavBar } from "../components/core/navbar/NavBar";
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
        className={`w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 h-full relative`}
      > 
        <div className=" w-full h-full flex flex-col items-center justify-start">

          <NavBar></NavBar>

          {children}
        </div>
      </body>
    </html>
  );
}

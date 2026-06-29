import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import QRCode from "@/components/qrcode/QRCode";
// import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phuc Anh | Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  // if (pathname === "/happy-birthday") {
  //   return <div>{children}</div>;
  // }
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>

      <body
      // className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <QRCode />
        {/* <StarsCanvas />
        <Navbar />
        {children}
        <Footer /> */}
      </body>
    </html>
  );
}

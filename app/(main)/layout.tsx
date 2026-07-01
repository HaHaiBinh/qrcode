import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import QRCode from "@/components/qrcode/QRCode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grab | Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>

      <body
      >
        <QRCode />
      </body>
    </html>
  );
}

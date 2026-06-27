import "../globals.css";

export const metadata = {
  title: "QR Code",
  description: "Scan this page on any phone size.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

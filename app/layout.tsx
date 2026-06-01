import type { Metadata } from "next";
import "./globals.css";
import { Loader } from "@/components/Loader";

export const metadata: Metadata = {
  title: "Transcend | The Next Era of Digital Experiences",
  description: "A visually distinct landing page clone inspired by Zentry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning>
        <Loader>{children}</Loader>
      </body>
    </html>
  );
}

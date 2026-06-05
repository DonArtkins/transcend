import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Loader } from "@/components/Loader";

const title = "Transcend | The Next Era of Digital Experiences";
const description =
  "Step into the Nexus. A boundless metagame layer where Web2 and Web3 converge into one interconnected universe of play.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Transcend",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "Transcend",
    title,
    description,
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Transcend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/android-chrome-512x512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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

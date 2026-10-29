import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import rawData from "@/data/templates.json";
import { WebserviceTemplateData } from "@/types/templates.types";

const templateData: WebserviceTemplateData = rawData;
const siteMetadata = templateData.common.siteMetadata;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  icons: {
    icon: siteMetadata.icon,
    shortcut: siteMetadata.icon,
    apple: siteMetadata.icon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

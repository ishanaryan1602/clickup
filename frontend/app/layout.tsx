import type { Metadata } from "next";
import "./globals.css";
import { inter, plusJakartaSans } from '@/app/ui/fonts'

export const metadata: Metadata = {
  title: "Click Up",
  description: "The everything app, for work",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${plusJakartaSans.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

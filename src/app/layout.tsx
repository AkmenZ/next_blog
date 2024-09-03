import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import SessionProvider from "./lib/provider";
import { Suspense } from "react";
import { Providers } from "./providers";
import Nav from "./components/Nav";
import CookieConsent from "./components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ak-blog.com",
  description: "Web and Mobile development tutorials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SessionProvider>
            <Nav></Nav>
            <div className="container mx-auto">{children}</div>
            <Suspense>
              <LoginModal></LoginModal>
            </Suspense>
            <CookieConsent></CookieConsent>
            <Footer></Footer>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

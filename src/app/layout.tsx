import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/PasswordProtection";
import { isPasswordProtectionEnabled } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "O2 Competitive Analysis Dashboard",
  description: "Comprehensive insights into market positioning and competitive landscapes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requiresAuth = isPasswordProtectionEnabled();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider requiresAuth={requiresAuth}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

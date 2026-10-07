import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/features/home/Header";
import { SideNav } from "@/features/home/SideNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: { default: "Hayatullah Rahnamoon — Full-Stack Developer", template: "%s · Hayatullah Rahnamoon" },
  description: "Full-stack developer in Berlin building scalable web and mobile products with Next.js, Angular, React, Flutter and Claude MCP.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};
export const viewport: Viewport = { themeColor: "#34373c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-brand focus:px-4 focus:py-2 focus:text-bg-sunken">Skip to content</a>
        <Header />
        <SideNav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}

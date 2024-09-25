import { Footer } from "@/src/feature/layout/Footer";
import { Header } from "@/src/feature/layout/Header";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decrypto",
  description: "",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "bg-background")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="bg-green-600">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

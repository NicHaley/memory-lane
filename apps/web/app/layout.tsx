import "@repo/ui/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@repo/lib/classnames";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body className={cn("h-full", inter.className)}>{children}</body>
    </html>
  );
}

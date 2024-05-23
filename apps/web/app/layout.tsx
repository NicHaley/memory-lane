import "@repo/ui/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@repo/lib/classnames";
import { Toaster } from "@repo/ui/components/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body className={cn("h-full", inter.className)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pt-8 pt-4">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}

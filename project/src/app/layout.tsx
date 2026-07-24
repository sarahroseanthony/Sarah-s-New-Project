import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarah's New Project",
  description: "A new project by Sarah — coming soon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

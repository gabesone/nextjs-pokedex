import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Container } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS Pokédex",
  description: "NextJS Pokédex app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Container className="py-4">{children}</Container>
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/fragments/Header";
import Footer from "@/fragments/Footer";



export const metadata: Metadata = {
  title: "FoKojo",
  description: "Bridging Markets, Building Futures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className={`antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class">
          <Header/>
          {children}
          <Footer/>
          </ThemeProvider>
      </body>
    </html>
  );
}

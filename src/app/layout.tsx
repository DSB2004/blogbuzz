import type { Metadata } from "next";
import ErrorProvider from "./_context/useError.context";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlogBuzz",
  description: "A typescript based blogging site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`min-h-screen relative`}>
        <ErrorProvider>
          {children}
        </ErrorProvider>
      </body>
    </html >
  );
}

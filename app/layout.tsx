import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bhagavad Gita (Very Simple App)",
  description: "Very Simple but functional Bhagavad Gita web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import { Geist } from "next/font/google";
import "./globals.css";
import { content } from "../data/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: content.metadata.canonicalUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} h-full antialiased`}
      style={{ scrollBehavior: "auto" }}
    >
      <head>
        <script
          type="application/ld+json"
          id="geo-schema-ld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(content.schema) }}
        />
      </head>
      <body className="min-h-full bg-[#0a0a0a] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Note: other existing app routes (dashboard, focus, login) are preserved
// The landing page at / is the complete recreation of focusnebula.in

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05070B",
};

export const metadata: Metadata = {
  title: "FocusNebula - The Ultimate Focus Study App",
  description:
    "FocusNebula is a dedicated study app designed to help you track your study sessions, collaborate with study crews, and maintain deep focus without distractions.",
  keywords: ["study app", "focus timer", "productivity tool", "study crew", "deep work", "focus app"],
  openGraph: {
    title: "FocusNebula - The Ultimate Focus Study App",
    description: "Track your study sessions, collaborate with your crew, and maintain deep focus with FocusNebula.",
    type: "website",
    url: "https://focusnebula.in/",
    images: [{ url: "https://focusnebula.in/assets/brand/focusnebula-social.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusNebula - The Ultimate Focus Study App",
    description: "Track your study sessions, collaborate with your crew, and maintain deep focus with FocusNebula.",
    images: ["https://focusnebula.in/assets/brand/focusnebula-social.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${spaceGrotesk.variable}`}
      style={{ fontFamily: "var(--font-outfit), sans-serif" } as React.CSSProperties}
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "FocusNebula",
              url: "https://focusnebula.in/",
              applicationCategory: "ProductivityApplication",
              description:
                "A calm study focus timer with crews, progress tracking, and deep work tools.",
            }),
          }}
        />
      </head>
      <body>
        {/* SVG Glow Filter */}
        <svg
          style={{ width: 0, height: 0, position: "absolute" }}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="glow-4" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur8" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur16" />
              <feColorMatrix in="blur2" result="glow2" type="matrix" values="1 0 0 0 0  0 0.95 0 0 0  0 0.9 0 0 0  0 0 0 0.8 0" />
              <feColorMatrix in="blur8" result="glow8" type="matrix" values="1 0 0 0 0  0 0.95 0 0 0  0 0.9 0 0 0  0 0 0 0.5 0" />
              <feColorMatrix in="blur16" result="glow16" type="matrix" values="1 0 0 0 0  0 0.95 0 0 0  0 0.9 0 0 0  0 0 0 0.2 0" />
              <feMerge>
                <feMergeNode in="glow16" />
                <feMergeNode in="glow8" />
                <feMergeNode in="glow2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {children}
      </body>
    </html>
  );
}

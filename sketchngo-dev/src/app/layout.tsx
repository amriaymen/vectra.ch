import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const ttFirs = localFont({
  src: [
    {
      path: "./fonts/TT Firs Neue Trial ExtraLight.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/TT Firs Neue Trial Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/TT Firs Neue Trial Medium.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-tt-firs",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SketchnGo Dev — Custom Software & Web Applications",
    template: "%s | SketchnGo Dev",
  },
  description:
    "SketchnGo Dev builds custom software, web applications, and digital products for growing businesses. No subscriptions — just results.",
  keywords: [
    "custom software development",
    "web application development",
    "React Next.js developer",
    "SaaS development",
    "digital product studio",
    "freelance developer Tunisia",
  ],
  authors: [{ name: "SketchnGo Dev" }],
  creator: "SketchnGo Dev",
  metadataBase: new URL("https://sketchngo.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sketchngo.dev",
    siteName: "SketchnGo Dev",
    title: "SketchnGo Dev — Custom Software & Web Applications",
    description:
      "We build custom software and digital products for growing businesses. Fast delivery, no long-term commitments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SketchnGo Dev — Custom Software & Web Applications",
    description:
      "We build custom software and digital products for growing businesses.",
    creator: "@sketchngodesign",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${ttFirs.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

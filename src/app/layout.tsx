import type { Metadata } from "next"
import { Instrument_Serif, Inter, Inter_Tight, JetBrains_Mono } from "next/font/google"
import { GoogleAnalytics } from "@/components/google-analytics"
import { Footer } from "@/components/footer"
import { LinkTracker } from "@/components/link-tracker"
import { ContactDock } from "@/components/contact-dock"
import { LazyCursor } from "@/components/lazy-cursor"
import { MotionProvider } from "@/components/motion-provider"
import { Navbar } from "@/components/navbar"
import { ScrollProgress } from "@/components/scroll-progress"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import { hasResume } from "@/lib/resume"
import { personJsonLd, site, siteUrl } from "@/lib/site"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "optional",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "optional",
})

const jetbrainsMono = JetBrains_Mono({
  preload: false,
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "optional",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: "%s · Harsh Lariya",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  keywords: [
    "Harsh Lariya",
    "Product Manager",
    "AI Product Manager",
    "Technical Product Manager",
    "Data platforms",
    "Applied AI",
    "EdTech",
    "B2B SaaS",
    "Product portfolio",
    "Gurugram",
  ],
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    locale: "en_IN",
    firstName: "Harsh",
    lastName: "Lariya",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const resume = await hasResume()
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip bg-bg font-sans text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <ThemeProvider>
          <MotionProvider>
            <SmoothScroll>
              <ScrollProgress />
              <Navbar hasResume={resume} />
              <LazyCursor />
              {children}
              <Footer />
            </SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
        <ContactDock />
        <GoogleAnalytics />
        <LinkTracker />
      </body>
    </html>
  )
}

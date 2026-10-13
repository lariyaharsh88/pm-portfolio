import type { Metadata } from "next"
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Footer } from "@/components/footer"
import { LinkTracker } from "@/components/link-tracker"
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
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.name,
    template: "%s · Harsh Lariya",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const resume = await hasResume()
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
        {process.env.VERCEL ? (
          <>
            <Analytics />
            <LinkTracker />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  )
}

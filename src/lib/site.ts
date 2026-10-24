import type { Metadata } from "next"

function readSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return "http://localhost:3000"
  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/$/, "")
}

export const siteUrl = readSiteUrl()

/** Page metadata with matching Open Graph and Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const fullTitle = `${title} · Harsh Lariya`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Harsh Lariya", title: fullTitle, description, url: path },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  }
}

export const site = {
  name: "Harsh Lariya",
  headline: "I build data-heavy products that turn messy workflows into measurable growth.",
  title: "Harsh Lariya | Product Manager · Data Platforms & Applied AI",
  role: "Product Manager · Data Platforms & Applied AI",
  description:
    "Harsh Lariya is a Product Manager with 5 years in EdTech & B2B SaaS. Led a lead platform that handled 78M+ records and 600+ clients, and shipped 6 live products.",
  email: "lariyaharsh88@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshlariya/",
  github: "https://github.com/lariyaharsh88",
  phone: "tel:+918882332594",
  phoneLabel: "+91 88823 32594",
  emailLink: `mailto:lariyaharsh88@gmail.com?subject=${encodeURIComponent("Product Manager opportunity")}`,
  whatsapp: `https://wa.me/918882332594?text=${encodeURIComponent(
    "Hi Harsh, I saw your portfolio and would like to talk about a Product Manager role.",
  )}`,
  location: "Gurugram",
} as const

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/products", label: "Products" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
] as const

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Product Manager",
    description: site.description,
    email: site.email,
    url: siteUrl,
    image: `${siteUrl}/me-headshot.jpg`,
    homeLocation: {
      "@type": "Place",
      name: site.location,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Delhi Technological University",
    },
    sameAs: [site.linkedin, site.github],
  }
}

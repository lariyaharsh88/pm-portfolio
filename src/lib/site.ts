function readSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return "http://localhost:3000"
  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/$/, "")
}

export const siteUrl = readSiteUrl()

export const site = {
  name: "Harsh Lariya",
  headline: "I build data-heavy products that turn messy workflows into measurable growth.",
  description:
    "Product manager focused on data quality and applied AI. Open to PM and AI PM roles.",
  email: "lariyaharsh88@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshlariya/",
  github: "https://github.com/lariyaharsh88",
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

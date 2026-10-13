export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  relationship: string
}

// Add real quotes, with permission. The home-page section stays hidden while this list is empty.
export const testimonials: readonly Testimonial[] = []

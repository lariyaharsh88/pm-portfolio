export type Testimonial = {
  /** Paragraphs separated by a blank line. */
  quote: string
  name: string
  role?: string
  company?: string
  relationship?: string
  /** Square headshot under /public/testimonials. */
  photo?: string
  linkedin?: string
}

// Add real quotes, with permission. The home-page section stays hidden while this list is empty.
export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "Having worked with him from the very beginning, I’ve had the opportunity to collaborate on building 6–7 products from scratch, and it has been a genuinely rewarding experience. What stands out most about him is his strong technical understanding alongside his product mindset. He doesn’t just focus on what needs to be built; he understands the technical complexities, dependencies, and challenges involved in bringing a product to life.\n\nAs a Tech Lead, there were times when estimating timelines was challenging due to the complexity of certain features, and he was always supportive and understanding. Rather than putting unnecessary pressure on delivery dates, he worked closely with us to align expectations and find practical ways to move forward. His involvement throughout the product lifecycle, from design discussions and requirement planning to development, QA, and final delivery, made a real difference.\n\nOne thing I particularly appreciated was his attention to detail during product revamps and improvements.",
    name: "Gopal Mishra",
    role: "Tech Lead",
    relationship: "Built 6–7 products together",
    photo: "/testimonials/gopal-mishra.webp",
    linkedin: "https://www.linkedin.com/in/gopal-mishra-b40688214",
  },
  {
    quote:
      "I’ve worked with Harsh from the operations side, and what sets him apart is how seriously he takes the ground reality. Before building anything, he sits with the team to understand how the work actually happens. The result is products that fit our workflow, not the other way round. Work that used to take my team hours of manual effort now gets done in minutes. He is clear in communication, quick to act on feedback, and always thinking one step ahead of the problem.",
    name: "Dinesh Singh",
    relationship: "Operations",
    photo: "/testimonials/dinesh-singh.webp",
    linkedin: "https://www.linkedin.com/in/dineshsinghk/",
  },
  {
    quote:
      "I had a wonderful experience working with Harsh Lariya. One of his greatest strengths is his ability to understand ideas, requirements, and expectations clearly. Whenever I needed to discuss a plan or explain a concept, he was quick to grasp the vision and consistently delivered results that aligned perfectly with the expectations.\n\nHe is highly efficient, delivers work within short timelines, and ensures proper testing and quality before considering a task complete. From a product management perspective, Harsh has strong knowledge, a practical approach to problem-solving, and a clear understanding of execution.\n\nBeyond his professional skills, he is approachable, supportive, and genuinely pleasant to work with. He is not only a great professional but also a wonderful human being. I truly enjoyed working with him and would highly recommend him to anyone looking for a dedicated and knowledgeable professional.",
    name: "Himanshu Rathore",
    photo: "/testimonials/himanshu-rathore.webp",
    linkedin: "https://www.linkedin.com/in/himanshurathore95883",
  },
  {
    quote:
      "Really loved the idea! The design is clean, smooth and user-friendly. Great work on the overall experience and attention to detail.",
    name: "Pari Sharma",
    role: "Junior Developer",
    relationship: "Teammate",
    photo: "/testimonials/pari-sharma.webp",
    linkedin: "https://www.linkedin.com/in/pari-sharma-92713b2a3",
  },
]

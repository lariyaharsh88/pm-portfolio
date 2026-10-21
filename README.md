This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# harsh-portfolio

Personal portfolio of Harsh Lariya, Product Manager. Live at https://pm-portfolio-khaki.vercel.app

Next.js App Router, TypeScript, Tailwind v4, Motion, Lenis, MDX case studies via next-mdx-remote.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # must pass with zero TS/ESLint errors before deploying
```

## Content lives in `src/content/`

- `case-studies/*.mdx`: one file per case study. Frontmatter needs title, slug, summary, role, company, timeline, team, tags, metrics, accent (6-digit hex), cover, status (`published` or `draft`). Drafts render only in development. Display order is `publishedOrder` in `src/lib/case-studies.ts`.
- `writing/*.mdx`: notes and articles.
- `projects.ts`: the home-page Selected Work cards. `experience.ts`, `products.ts`, `testimonials.ts`: the other pages. The testimonials section stays hidden while the list is empty.
- Assets in `public/`. Covers are code-built SVGs in `public/case-studies/`; no company screenshots.

## Deploy

Vercel, root of this repo. Env: `NEXT_PUBLIC_SITE_URL` (set to the custom domain once bought).

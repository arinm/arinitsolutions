# Arinit Solutions

Corporate website for [arinitsolutions.com](https://arinitsolutions.com).

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Content**: MDX (next-mdx-remote)
- **Forms**: React Hook Form + Zod v4
- **Email**: Resend
- **Icons**: Lucide React
- **SEO**: Next.js Metadata API, next-sitemap, JSON-LD

## Getting Started

```bash
npm install
cp .env.example .env   # add your Resend API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build + sitemap |
| `npm run start` | Production server |
| `npm run lint` | ESLint |

## Project Structure

```
src/
├── app/                  # Pages (App Router)
│   ├── services/         # Service pages (web, mobile, cloud, ai)
│   ├── work/             # Portfolio + [slug] case studies (MDX)
│   ├── insights/         # Blog + [slug] articles (MDX)
│   ├── contact/          # Contact form
│   ├── legal/            # Privacy, Cookies, AI Use
│   └── api/contact/      # POST handler (Resend)
├── components/
│   ├── ui/               # Primitives (Button, Card, Badge, etc.)
│   ├── layout/           # Nav, Footer, Container, CookieBanner
│   └── sections/         # Hero, CtaBanner, Timeline, etc.
├── lib/                  # Utils, animations, content loader, schemas
content/
├── work/                 # Case study MDX files
└── insights/             # Blog post MDX files
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_A_K` | API key from [resend.com](https://resend.com) |

## Deployment

Push to GitHub, import in Vercel. Add `RESEND_A_K` in Vercel environment variables. Zero config needed.

## License

Private. All rights reserved.

# SEO Setup Checklist

After deploying to production, complete these steps to activate search discovery.

## Environment

Set `NEXT_PUBLIC_SITE_URL` to your production domain (see `.env.example`):

```bash
NEXT_PUBLIC_SITE_URL=https://tenantradar.com
```

This drives canonical URLs, Open Graph tags, sitemap entries, and robots.txt.

## Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership (DNS TXT record recommended for domain properties)
4. Submit sitemap: `https://tenantradar.sashflow.com/sitemap.xml`
5. Request indexing for `/` and key pages (`/blog`, `/for/landlords`, etc.)

## Verify metadata

- View page source on `/` — confirm `<title>`, `<meta name="description">`, and `og:` tags
- Test social previews: [opengraph.xyz](https://www.opengraph.xyz/) or LinkedIn Post Inspector
- Confirm `/early-access` has `noindex` in robots meta

## KPIs to track (90-day baseline)

| Metric | Where |
|--------|-------|
| Indexed pages | Google Search Console → Pages |
| Impressions & clicks | GSC → Performance |
| Average position | GSC → Performance (filter by query) |
| Rich results | GSC → Enhancements → FAQ |
| Blog → early-access CTR | Vercel Analytics + UTM params on blog CTAs |

## Ongoing cadence

- Publish 2 blog posts/month minimum
- Refresh home FAQ and metadata quarterly based on GSC query data
- Update `dateModified` in blog frontmatter when revising posts

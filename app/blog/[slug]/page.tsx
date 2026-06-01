import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content/posts";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { BlogCta } from "@/components/blog/BlogCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <BlogLayout
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      >
        <article>
          <time
            dateTime={post.date}
            className="text-xs font-semibold uppercase tracking-wider text-lavender"
          >
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-[1.6] text-muted-foreground">
            {post.description}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            By {post.author}
            {post.updated && (
              <>
                {" "}
                · Updated{" "}
                {new Date(post.updated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </>
            )}
          </p>
          <BlogPostContent content={post.content} />
          <BlogCta />

          {related.length > 0 && (
            <section className="mt-12 border-t border-border pt-10">
              <h2 className="text-lg font-bold text-foreground">
                Related articles
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </BlogLayout>
    </>
  );
}

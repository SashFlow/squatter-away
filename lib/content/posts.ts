import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(postsDirectory, filename);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      updated: data.updated as string | undefined,
      author: (data.author as string) ?? "Tenant Radar",
      tags: (data.tags as string[]) ?? [],
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .filter(
      (post) => post.tags.some((tag) => current.tags.includes(tag)) || true,
    )
    .slice(0, limit);
}

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string; slug: string; outlet: string; author: string; author_id: string;
  cover?: string; tags?: string[]; publishedAt: string; summary?: string;
};

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir);
  return files
    .filter(f => f.endsWith(".md") || f.endsWith(".mdx"))
    .map(f => {
      const raw = fs.readFileSync(path.join(postsDir, f), "utf8");
      const { data } = matter(raw);
      return data as PostMeta;
    })
    .sort((a,b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getPostBySlug(slug: string) {
  const filename = fs.readdirSync(postsDir).find(f =>
    f.includes(slug) && (f.endsWith(".md") || f.endsWith(".mdx")));
  if (!filename) return null;
  const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
  const { data, content } = matter(raw);
  return { meta: data as PostMeta, content };
}

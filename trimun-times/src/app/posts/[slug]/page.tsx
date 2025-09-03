import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import CommentSection from "@/components/CommentSection";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <p className="text-xs uppercase tracking-wide brand-gold">{post.meta.outlet}</p>
      <h1 className="!mb-1">{post.meta.title}</h1>
      <p className="opacity-75 !mt-0">By {post.meta.author} · {new Date(post.meta.publishedAt).toLocaleDateString()}</p>
      <div className="mt-6 prose-headings:scroll-mt-24">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
            },
          }}
        />
      </div>

      <hr className="my-10 border-white/10" />
      <CommentSection slug={post.meta.slug} />
    </article>
  );
}

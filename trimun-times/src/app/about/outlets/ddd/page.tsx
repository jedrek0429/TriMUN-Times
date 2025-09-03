import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import { toKebab } from "@/lib/slug";

export function generateStaticParams() {
  const outlets = Array.from(new Set(getAllPosts().map(p => p.outlet)));
  return outlets.map(o => ({ outlet: toKebab(o) }));
}

export default function OutletPage({ params }: { params: { outlet: string } }) {
  const posts = getAllPosts();
  const outletName = Array.from(new Set(posts.map(p => p.outlet)))
    .find(o => toKebab(o) === params.outlet);
  if (!outletName) return notFound();
  const list = posts.filter(p => p.outlet === outletName);

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide brand-gold">Outlet</p>
        <h1 className="text-3xl font-semibold">{outletName}</h1>
        <p className="opacity-70 mt-1">
          All stories published by <span className="brand-gold">{outletName}</span>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {list.map(p => (
          <Link key={p.slug} href={`/posts/${p.slug}`} className="card p-5 block hover:scale-[1.01] transition">
            <div className="text-xs opacity-70">{new Date(p.publishedAt).toLocaleDateString()}</div>
            <h2 className="text-lg font-semibold mt-1">{p.title}</h2>
            {p.summary && <p className="opacity-80 text-sm mt-1">{p.summary}</p>}
            <div className="mt-3 text-xs opacity-70">By {p.author}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

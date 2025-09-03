import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map(p => (
        <Link key={p.slug} href={`/posts/${p.slug}`}>
          <Card className="card overflow-hidden hover:scale-[1.01] transition">
            {p.cover && (
              <div className="relative h-44">
                <Image src={p.cover} alt="" fill className="object-cover" />
              </div>
            )}
            <CardContent className="p-5">
              <div className="text-xs uppercase tracking-wide brand-gold">{p.outlet}</div>
              <h2 className="text-xl font-semibold mt-1">{p.title}</h2>
              <p className="opacity-80 text-sm mt-1">{p.summary}</p>
              <div className="mt-3 text-xs opacity-70">
                By {p.author} · {new Date(p.publishedAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

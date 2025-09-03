import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { toKebab } from "@/lib/slug";

export const metadata = { title: "Outlets · TriMUN Times" };

export default function OutletsPage() {
  const posts = getAllPosts();
  const byOutlet = posts.reduce((acc: Record<string, typeof posts>, p) => {
    (acc[p.outlet] ??= []).push(p);
    return acc;
  }, {});
  const outlets = Object.entries(byOutlet)
    .map(([name, list]) => ({ name, list: list.slice(0, 4) }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Outlets</h1>
      <p className="opacity-70 mb-8">Each outlet has its own voice. Browse them below.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {outlets.map(({ name, list }) => (
          <Link key={name} href={`/outlets/${toKebab(name)}`} className="card p-5 block hover:scale-[1.01] transition">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold">{name}</h2>
              <span className="text-xs brand-gold">{list.length} latest</span>
            </div>
            <ul className="mt-3 space-y-1 text-sm opacity-85">
              {list.map(p => (
                <li key={p.slug} className="truncate">• {p.title}</li>
              ))}
            </ul>
            <div className="mt-4 text-sm brand-gold">View all →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

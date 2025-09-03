import Link from "next/link";

export const metadata = {
  title: "Outlets · TriMUN Times",
};

export default function OutletsPage() {
  // you can fetch/group posts later—this is just a valid page stub
  const outlets = [
    { name: "The Pepper", slug: "the-pepper", blurb: "Satire & sting." },
    { name: "DDD", slug: "ddd", blurb: "Deep Dive & Data." },
    { name: "YEEHAW! TV", slug: "yeehaw-tv", blurb: "Clips & interviews." },
    { name: "TriTok", slug: "tritok", blurb: "Shorts for the feed." },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Outlets</h1>
      <ul className="grid sm:grid-cols-2 gap-4">
        {outlets.map(o => (
          <li key={o.slug} className="rounded-xl p-4 bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold">{o.name}</h2>
            <p className="opacity-70 text-sm">{o.blurb}</p>
            <Link className="text-sm underline mt-2 inline-block" href={`/outlets/${o.slug}`}>
              View {o.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

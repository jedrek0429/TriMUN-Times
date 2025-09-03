export const metadata = { title: "About · TriMUN Times" };

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">About TriMUN Times</h1>
        <p className="opacity-80 mt-2 max-w-2xl">
          We’re the press arm of TriMUN—covering committees, culture, and backstage chaos with
          equal parts rigor and spice. Articles are Markdown; videos are uploaded by editors.
          Anonymous comments are welcome (be civil).
        </p>
      </header>

      <section className="card p-6">
        <h2 className="text-xl font-semibold">Mission</h2>
        <p className="opacity-80 mt-2">
          Inform fast. Entertain smart. Empower editors to experiment and publish responsibly.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="mt-2 space-y-1 opacity-85">
            <li>Email: <a href="mailto:press@trimun.times">press@trimun.times</a></li>
            <li>Instagram: <a href="https://instagram.com/trimun.times">@trimun.times</a></li>
            <li>TikTok: <a href="https://www.tiktok.com/@tri_tok">tri_tok</a></li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold">Submission Guidelines</h3>
          <ol className="mt-2 list-decimal list-inside space-y-1 opacity-85">
            <li>Write in Markdown/MDX with front-matter (title, outlet, author, slug, summary).</li>
            <li>Respect privacy; no doxxing or hate speech.</li>
            <li>Label satire clearly for The Pepper when needed.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}

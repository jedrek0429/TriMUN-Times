import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "TriMUN Times",
  description: "Your source for reports, stories & coverage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-trimun.gold/10 ring-1 ring-amber-200/30 flex items-center justify-center">
                {/* simple mast icon */}
                <span className="text-xl brand-gold">⛵</span>
              </div>
              <div>
                <div className="font-semibold tracking-wide">TriMUN Times</div>
                <div className="text-xs opacity-70 -mt-0.5">Press Corps · Gdynia</div>
              </div>
            </div>
            <nav className="text-sm opacity-90 flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/outlets">Outlets</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-sm opacity-70">
          © {new Date().getFullYear()} TriMUN Times · Built with ❤️ for MUN media
        </footer>
      </body>
    </html>
  );
}

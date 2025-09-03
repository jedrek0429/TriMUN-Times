"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type C = { id: number; nickname: string | null; body: string; created_at: string };

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<C[]>([]);
  const [body, setBody] = useState("");
  const [nick, setNick] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
    const json = await res.json();
    setComments(json.comments ?? []);
  }

  useEffect(() => { load(); }, [slug]);

  async function submit() {
    setSending(true); setError("");
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, body: body.trim(), nickname: nick.trim() || null }),
    });
    const json = await res.json();
    setSending(false);
    if (!res.ok) { setError(json.error ?? "Failed to post"); return; }
    setBody("");
    await load();
  }

  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>
      <Card className="card mb-6">
        <CardContent className="p-4 space-y-3">
          <Input
            placeholder="Nickname (optional)"
            value={nick}
            onChange={e => setNick(e.target.value)}
            className="bg-white/5 border-white/10"
          />
          <Textarea
            placeholder="Share your thoughts — no login needed."
            value={body}
            onChange={e => setBody(e.target.value)}
            className="bg-white/5 border-white/10 min-h-[120px]"
            maxLength={4000}
          />
          {error && <p className="text-red-300 text-sm">{error}</p>}
          <div className="flex items-center gap-3">
            <Button onClick={submit} disabled={sending || body.trim().length === 0} className="bg-trimun.gold text-black hover:bg-trimun.goldDark">
              {sending ? "Posting…" : "Post comment"}
            </Button>
            <p className="text-xs opacity-70">Be kind. We moderate if needed.</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {comments.length === 0 && <p className="opacity-70">No comments yet. Be first!</p>}
        {comments.map(c => (
          <div key={c.id} className="rounded-xl p-4 bg-white/5 border border-white/10">
            <div className="text-sm opacity-70 mb-1">
              {c.nickname || "Anonymous"} · {new Date(c.created_at).toLocaleString()}
            </div>
            <p className="whitespace-pre-wrap leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

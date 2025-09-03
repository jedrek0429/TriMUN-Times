declare global {
  // eslint-disable-next-line no-var
  var lastPosts: Map<string, number> | undefined;
}

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!, // server-side only
  { auth: { persistSession: false } }
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("slug", slug)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data });
}

export async function POST(req: NextRequest) {
  const { slug, body, nickname } = await req.json();

  if (!slug || !body || `${body}`.trim().length === 0) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // simple rate limit per IP hash (60s window)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "0.0.0.0";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);

  // naive in-memory limiter (resets on cold start). For production, move to Supabase/Redis.
  // Allow 1 comment per 30s per ipHash.
  const now = Date.now();
  global.lastPosts ??= new Map<string, number>();
  const last = global.lastPosts.get(ipHash) ?? 0;
  if (now - last < 30_000) {
    return NextResponse.json({ error: "Too many comments. Try again shortly." }, { status: 429 });
  }
  global.lastPosts.set(ipHash, now);

  // basic content guard
  if (body.length > 4000) {
    return NextResponse.json({ error: "Comment too long" }, { status: 400 });
  }

  const ua = req.headers.get("user-agent") ?? "";

  const { error } = await supabase
    .from("comments")
    .insert({ slug, body, nickname: nickname?.slice(0, 48), ip: null, user_agent: ua, is_approved: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

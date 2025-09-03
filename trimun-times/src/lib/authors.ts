import fs from "node:fs";
import path from "node:path";

export type Author = {
  id: string; name: string; role?: string; avatar?: string;
  links?: Record<string, string>;
};

export function getAllAuthors(): Author[] {
  const dir = path.join(process.cwd(), "content", "authors");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Author)
    .sort((a, b) => a.name.localeCompare(b.name));
}

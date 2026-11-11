import { llmsTxt } from "@/lib/crawler-files";

// Built once at build time from src/lib (see crawler-files.ts).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

import type { APIRoute } from "astro";
import { buildLlmsSummary } from "../lib/llms";

export const GET: APIRoute = () => {
  return new Response(buildLlmsSummary(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

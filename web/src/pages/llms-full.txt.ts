import type { APIRoute } from "astro";
import { buildLlmsFull } from "../lib/llms";

export const GET: APIRoute = () => {
  return new Response(buildLlmsFull(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

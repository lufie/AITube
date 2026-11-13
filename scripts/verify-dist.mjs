#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "web", "dist");
const RAW_BASE = process.env.BASE_PATH || "/";
const BASE_PREFIX = RAW_BASE === "/" ? "" : `/${RAW_BASE.replace(/^\/+|\/+$/g, "")}`;

const errors = [];
const assert = (cond, msg) => {
  if (!cond) errors.push(msg);
};

function stripBase(urlPath) {
  if (!BASE_PREFIX) return urlPath;
  if (urlPath === BASE_PREFIX || urlPath === `${BASE_PREFIX}/`) return "/";
  if (urlPath.startsWith(`${BASE_PREFIX}/`)) return urlPath.slice(BASE_PREFIX.length);
  return null;
}

function walkHtml(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(full, out);
    else if (ent.isFile() && ent.name.endsWith(".html")) out.push(full);
  }
  return out;
}

assert(fs.existsSync(DIST), `Missing dist directory at ${DIST}`);
for (const reqFile of ["sitemap.xml", "robots.txt", "llms.txt", "llms-full.txt", "search-corpus-zh.json", "search-corpus-en.json"]) {
  assert(fs.existsSync(path.join(DIST, reqFile)), `Missing required endpoint in dist: ${reqFile}`);
}

const htmlFiles = walkHtml(DIST);
assert(htmlFiles.length >= 640, `Expected >= 640 generated HTML pages, got ${htmlFiles.length}`);

for (const file of htmlFiles) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, "utf8");

  // 1. Single <h1>
  const h1s = html.match(/<h1[\s>]/gi) || [];
  assert(h1s.length === 1, `${rel}: expected exactly 1 <h1>, found ${h1s.length}`);

  // 2. Canonical
  const canMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  assert(canMatch && canMatch[1].startsWith("https://"), `${rel}: missing absolute canonical URL`);

  // 3. OG image exists on disk
  const ogMatch = html.match(/<meta\s+property="og:image"\s+content="https?:\/\/[^/]+(\/[^"]+)"/i);
  if (ogMatch) {
    const ogLocal = stripBase(ogMatch[1]);
    assert(ogLocal !== null, `${rel}: og:image missing BASE_PREFIX (${ogMatch[1]})`);
    if (ogLocal) {
      assert(fs.existsSync(path.join(DIST, ogLocal)), `${rel}: missing og:image file on disk (${ogLocal})`);
    }
  } else {
    errors.push(`${rel}: missing og:image meta tag`);
  }

  // 4. Valid JSON-LD
  const ldMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  assert(ldMatches.length >= 1, `${rel}: missing JSON-LD block`);
  for (const m of ldMatches) {
    try {
      JSON.parse(m[1]);
    } catch (err) {
      errors.push(`${rel}: invalid JSON-LD (${err.message})`);
    }
  }

  // 5. Internal link integrity (scan non-script HTML markup)
  const htmlNoScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const hrefs = [...htmlNoScripts.matchAll(/\shref="(\/[^"#?]*)/g)].map((m) => m[1]);
  for (const href of hrefs) {
    const localHref = stripBase(href);
    assert(localHref !== null, `${rel}: link missing BASE_PREFIX '${BASE_PREFIX}' -> ${href}`);
    if (localHref === null) continue;
    if (localHref === "/") {
      assert(fs.existsSync(path.join(DIST, "index.html")), `${rel}: broken root link /`);
      continue;
    }
    const candidateA = path.join(DIST, localHref);
    const candidateB = path.join(DIST, localHref, "index.html");
    assert(
      fs.existsSync(candidateA) || fs.existsSync(candidateB),
      `${rel}: broken internal link -> ${href} (resolved: ${localHref})`
    );
  }
}

if (errors.length > 0) {
  console.error(`[verify-dist] FAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 30)) console.error(" -", e);
  process.exit(1);
}

console.log(
  `[verify-dist] PASS (BASE_PATH='${BASE_PREFIX || "/"}') — ${htmlFiles.length} static HTML pages, OG cards, JSON-LD, and internal links 100% verified.`
);

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));

const conceptsDoc = readJson('content/concepts.json');
const taxonomy = readJson('content/taxonomy.json');
const stages = readJson('content/stages.json');
const vault = readJson('content/vault.json');
const nodes = readJson('content/nodes.json');

const errors = [];
const assert = (cond, msg) => {
  if (!cond) errors.push(msg);
};

// 1. Validate Eras & Concepts
const eraIds = new Set(conceptsDoc.eras.map((e) => e.id));
assert(eraIds.size === 5, `Expected 5 eras, got ${eraIds.size}`);
assert(conceptsDoc.seriesLabels.length === 10, 'seriesLabels must have 10 points');

const conceptSlugs = new Set(conceptsDoc.concepts.map((c) => c.slug));
assert(conceptSlugs.size === 22, `Expected 22 unique concepts, got ${conceptSlugs.size}`);

for (const c of conceptsDoc.concepts) {
  assert(eraIds.has(c.eraId), `Concept ${c.slug} invalid eraId ${c.eraId}`);
  assert(['surging', 'mainstream', 'foundational', 'evolved'].includes(c.lifecycle), `Concept ${c.slug} invalid lifecycle`);
  assert(Array.isArray(c.trendSeries) && c.trendSeries.length === 10, `Concept ${c.slug} trendSeries must be length 10`);
  assert(c.inflectionIndex >= 0 && c.inflectionIndex < 10, `Concept ${c.slug} invalid inflectionIndex`);
  for (const ref of [...(c.lineage?.from || []), ...(c.lineage?.into || [])]) {
    assert(conceptSlugs.has(ref), `Concept ${c.slug} lineage ref ${ref} missing`);
  }
  for (const lang of ['en', 'zh']) {
    assert(
      c[lang]?.name && c[lang]?.shortName && c[lang]?.oneLiner && c[lang]?.paradigmShift && c[lang]?.whyNow,
      `Concept ${c.slug} missing ${lang} copy`
    );
  }
}

// 2. Validate Stages, Vault & Taxonomy
const stageIds = new Set(stages.map((s) => s.id));
const vaultIds = new Set(vault.map((v) => v.id));
const facetSets = {};
const facetCounts = {};

for (const dim of taxonomy.dimensions) {
  facetSets[dim.prop] = new Set(dim.items.map((i) => i.slug));
  for (const item of dim.items) {
    facetCounts[`${dim.key}:${item.slug}`] = 0;
  }
}

// 3. Validate Nodes
assert(nodes.length >= 250, `Expected >= 250 nodes, got ${nodes.length}`);
const seenSlugs = new Set();
const seenVideos = new Set();
const conceptNodeCounts = Object.fromEntries([...conceptSlugs].map((s) => [s, 0]));

for (const n of nodes) {
  assert(!seenSlugs.has(n.slug), `Duplicate node slug: ${n.slug}`);
  seenSlugs.add(n.slug);
  assert(conceptSlugs.has(n.primaryConcept), `Node ${n.slug} unknown primaryConcept ${n.primaryConcept}`);
  assert(Array.isArray(n.conceptIds) && n.conceptIds.includes(n.primaryConcept), `Node ${n.slug} conceptIds must include primaryConcept`);
  for (const cid of n.conceptIds) {
    assert(conceptSlugs.has(cid), `Node ${n.slug} unknown conceptId ${cid}`);
    conceptNodeCounts[cid] += 1;
  }
  assert(['origin', 'practice', 'frontier'].includes(n.conceptRole), `Node ${n.slug} invalid conceptRole`);
  assert(stageIds.has(n.stageId), `Node ${n.slug} invalid stageId ${n.stageId}`);
  assert(vaultIds.has(n.vaultId), `Node ${n.slug} invalid vaultId ${n.vaultId}`);

  for (const prop of ['domains', 'tasks', 'stacks']) {
    const arr = n.facets?.[prop] || [];
    assert(arr.length >= 1, `Node ${n.slug} empty facets.${prop}`);
    const dimKey = prop === 'domains' ? 'domain' : prop === 'tasks' ? 'task' : 'stack';
    for (const f of arr) {
      assert(facetSets[prop].has(f), `Node ${n.slug} invalid ${prop} facet: ${f}`);
      facetCounts[`${dimKey}:${f}`] += 1;
    }
  }

  const s = n.source;
  if (s.kind === 'video-cut') {
    const vkey = `${s.platform}:${s.videoId}`;
    assert(!seenVideos.has(vkey), `Duplicate videoId ${vkey} in ${n.slug}`);
    seenVideos.add(vkey);
    assert(
      Number.isInteger(s.startSec) &&
        Number.isInteger(s.endSec) &&
        Number.isInteger(s.totalDurationSec) &&
        s.startSec >= 0 &&
        s.startSec < s.endSec &&
        s.endSec <= s.totalDurationSec,
      `Node ${n.slug} invalid slice [${s.startSec}, ${s.endSec}] / ${s.totalDurationSec}`
    );
  } else if (s.kind === 'article-digest') {
    assert(typeof s.articleUrl === 'string' && s.articleUrl.startsWith('https://'), `Node ${n.slug} invalid articleUrl`);
  } else {
    errors.push(`Node ${n.slug} invalid source.kind ${s.kind}`);
  }

  for (const lang of ['en', 'zh']) {
    const loc = n[lang];
    assert(loc?.title && loc?.subtitle && loc?.whyWatch && loc?.versionPatch, `Node ${n.slug} incomplete ${lang} copy`);
    assert(Array.isArray(loc?.steps) && loc.steps.length === 3, `Node ${n.slug} ${lang}.steps must have 3 steps`);
    assert(Array.isArray(loc?.checklist) && loc.checklist.length >= 2, `Node ${n.slug} ${lang}.checklist < 2`);
    assert(Array.isArray(loc?.tools) && loc.tools.length >= 1, `Node ${n.slug} ${lang}.tools empty`);
  }
}

for (const [cid, cnt] of Object.entries(conceptNodeCounts)) {
  assert(cnt >= 5, `Concept ${cid} has too few nodes (${cnt})`);
}
for (const [fkey, cnt] of Object.entries(facetCounts)) {
  assert(cnt >= 3, `Topic facet ${fkey} has fewer than 3 nodes (${cnt})`);
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 25)) console.error(' -', e);
  process.exit(1);
}

const spineCount = nodes.filter((n) => n.isSpine).length;
console.log(
  `[validate-content] PASS — ${nodes.length} nodes (${spineCount} spine), ${conceptsDoc.concepts.length} concepts, ${Object.keys(facetCounts).length} topic facets verified.`
);

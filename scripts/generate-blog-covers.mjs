// Generates the abstract 16:9 cover art for blog posts.
// Run with: node scripts/generate-blog-covers.mjs
// Writes both the source .svg and a rendered .png (post.image points at the .png).
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "Images", "blog");
const W = 1600;
const H = 900;

// Stable per-slug PRNG so re-running the script does not reshuffle the art.
function makeRng(seed) {
  let h = 2166136261;
  for (const ch of seed) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const defs = `<defs><radialGradient id="glow"><stop stop-color="#57e4b0" stop-opacity=".45"/><stop offset="1" stop-color="#071c18" stop-opacity="0"/></radialGradient><linearGradient id="stroke"><stop stop-color="#16372e"/><stop offset=".5" stop-color="#7de3b5"/><stop offset="1" stop-color="#16372e"/></linearGradient><linearGradient id="veil" x2="1" y2="1"><stop stop-color="#061410"/><stop offset="1" stop-color="#112a27"/></linearGradient></defs>`;

// A bundle of lines that converge on the centre, then fan back out.
function converge(rng) {
  const cx = W / 2;
  const cy = H / 2 + (rng() - 0.5) * 40;
  const n = 15 + Math.floor(rng() * 7);
  const step = 26 + rng() * 10;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const off = i - (n - 1) / 2;
    const y = cy + off * step;
    const bow = cy + off * step * 2.2;
    parts.push(
      `<path d="M-200 ${y.toFixed(1)} C320 ${bow.toFixed(1)} 620 ${(cy + off * step * 0.18).toFixed(1)} ${cx} ${cy.toFixed(1)} S1280 ${bow.toFixed(1)} 1800 ${y.toFixed(1)}" fill="none" stroke="url(#stroke)" stroke-width="1.5" opacity=".6"/>`,
    );
  }
  return parts.join("");
}

// Thin diagonal ribbons sweeping across the frame.
function fan(rng) {
  const parts = [];
  const n = 26 + Math.floor(rng() * 10);
  const gap = 62;
  for (let i = 0; i < n; i++) {
    const x = -520 + i * gap;
    parts.push(`<path d="M${x} -40 L${x + 940} 940" stroke="#6cddaa" opacity=".13"/>`);
  }
  return parts.join("");
}

// Concentric rings radiating from the centre.
function ripple(rng) {
  const cx = W / 2 + (rng() - 0.5) * 200;
  const cy = H / 2 + (rng() - 0.5) * 120;
  const n = 18 + Math.floor(rng() * 14);
  const sq = 0.6 + rng() * 0.3;
  const spread = 1200 + rng() * 600;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const r = 110 + i * (spread / n);
    parts.push(
      `<ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${r.toFixed(0)}" ry="${(r * sq).toFixed(0)}" fill="none" stroke="#6cddaa" opacity=".16"/>`,
    );
  }
  return parts.join("");
}

// Vertical waves flowing down the frame.
function flow(rng) {
  const parts = [];
  const n = 24;
  const gap = 74;
  for (let i = 0; i < n; i++) {
    const x = -100 + i * gap;
    const w = 60 + rng() * 70;
    parts.push(
      `<path d="M${x} -60 C${x + w} 240 ${x - w} 660 ${x} 960" fill="none" stroke="url(#stroke)" stroke-width="1.4" opacity=".55"/>`,
    );
  }
  return parts.join("");
}

// Soft horizontal bands drifting across the background.
function lattice() {
  const parts = [];
  const n = 18;
  for (let i = 0; i < n; i++) {
    const y = 60 + i * 46;
    parts.push(
      `<path d="M-150 ${y} C300 ${y - 220} 650 ${y + 260} 1100 ${y - 10} S1450 ${y + 150} 1800 ${y - 40}" fill="none" stroke="url(#stroke)" stroke-width="30" opacity=".13"/>`,
    );
  }
  return parts.join("");
}

// Fine crosshatch mesh.
function grid() {
  const parts = [];
  for (let i = 0; i < 26; i++) {
    const x = -100 + i * 70;
    parts.push(`<path d="M${x} -40 L${x} 940" stroke="#6cddaa" opacity=".12"/>`);
  }
  for (let i = 0; i < 16; i++) {
    const y = -40 + i * 70;
    parts.push(`<path d="M-40 ${y} L1640 ${y}" stroke="#6cddaa" opacity=".12"/>`);
  }
  return parts.join("");
}

const motifs = { converge, fan, ripple, flow, lattice, grid };

// slug -> motif. Keep these unique per slug so AR/EN translations share a cover.
const posts = [
  ["avoid-banned-whatsapp-number", "converge"],
  ["how-to-send-whatsapp-messages-in-laravel", "flow"],
  ["how-we-handle-whatsapp-message-capping", "ripple"],
  ["how-we-handle-whatsapp-timelock-restrictions", "converge"],
  ["hypersender-whatsapp-api-vs-whatsapp-business-api-which-is-right-for-your-business", "fan"],
  ["introducing-hypersender-laravel-sdk", "lattice"],
  ["introducing-webhook-logs", "grid"],
  ["using-whatsapp-business-with-landline", "ripple"],
];

await mkdir(outDir, { recursive: true });

for (const [slug, motif] of posts) {
  const rng = makeRng(slug);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defs}<rect width="${W}" height="${H}" fill="url(#veil)"/><ellipse cx="${W / 2}" cy="${H / 2}" rx="740" ry="520" fill="url(#glow)"/>${motifs[motif](rng)}</svg>`;

  await writeFile(path.join(outDir, `${slug}.svg`), svg);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}.png`));
  console.log(`✓ ${slug}.png + .svg`);
}

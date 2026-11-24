// Composes baseline (left) vs upgraded (right) screenshots with a pixel-diff %, and writes report/README.md.
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const report = path.join(__dirname, 'report');
const screens = path.join(report, 'screens');
const outDir = path.join(report, 'side-by-side');
fs.mkdirSync(outDir, { recursive: true });

function load(file) {
  return fs.existsSync(file) ? PNG.sync.read(fs.readFileSync(file)) : null;
}

function pad(img, w, h) {
  const out = new PNG({ width: w, height: h });
  out.data.fill(255);
  PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
  return out;
}

const names = fs.existsSync(path.join(screens, 'baseline'))
  ? fs.readdirSync(path.join(screens, 'baseline')).filter(f => f.endsWith('.png')).sort()
  : [];
const shots = [];
for (const name of names) {
  const a = load(path.join(screens, 'baseline', name));
  const b = load(path.join(screens, 'upgraded', name));
  if (!b) { shots.push({ name, diff: 'missing upgraded' }); continue; }
  const w = Math.max(a.width, b.width), h = Math.max(a.height, b.height);
  const pa = pad(a, w, h), pb = pad(b, w, h);
  const diffImg = new PNG({ width: w, height: h });
  const changed = pixelmatch(pa.data, pb.data, diffImg.data, w, h, { threshold: 0.1 });
  const gap = 16;
  const combo = new PNG({ width: w * 2 + gap, height: h });
  combo.data.fill(0);
  PNG.bitblt(pa, combo, 0, 0, w, h, 0, 0);
  PNG.bitblt(pb, combo, 0, 0, w, h, w + gap, 0);
  fs.writeFileSync(path.join(outDir, name), PNG.sync.write(combo));
  shots.push({ name, diff: ((changed / (w * h)) * 100).toFixed(2) + '%', size: `${a.width}x${a.height} / ${b.width}x${b.height}` });
}

const results = fs.existsSync(path.join(report, 'results.json'))
  ? JSON.parse(fs.readFileSync(path.join(report, 'results.json'), 'utf8'))
  : { suites: [] };
const rows = new Map();
(function walk(suites, file) {
  for (const s of suites) {
    const f = s.file || file;
    for (const spec of s.specs || []) {
      for (const t of spec.tests) {
        const key = `${path.basename(f)} › ${spec.title}`;
        const row = rows.get(key) || {};
        row[t.projectName] = t.results.at(-1)?.status ?? t.status;
        rows.set(key, row);
      }
    }
    walk(s.suites || [], f);
  }
})(results.suites, '');

const icon = s => (s === 'passed' ? 'pass' : s ? `**${s}**` : 'not run');
const count = (p, st) => [...rows.values()].filter(r => r[p] === st).length;
let md = '# Parity report: baseline (Angular 17, :4000) vs upgraded (Angular 21, :4200)\n\n';
md += 'Same Playwright specs run against both apps (`parity/specs`). Regenerate with `npm test && npm run report` in `parity/`.\n\n';
md += `Totals: baseline ${count('baseline', 'passed')} passed / ${count('baseline', 'failed')} failed; `;
md += `upgraded ${count('upgraded', 'passed')} passed / ${count('upgraded', 'failed')} failed.\n\n`;
md += '| Page / flow | Baseline | Upgraded |\n|---|---|---|\n';
for (const [k, r] of rows) md += `| ${k} | ${icon(r.baseline)} | ${icon(r.upgraded)} |\n`;
md += '\n## Screenshots (baseline left, upgraded right)\n\n| Page | Pixel diff | Size (baseline / upgraded) |\n|---|---|---|\n';
for (const s of shots) md += `| [${s.name}](side-by-side/${s.name}) | ${s.diff} | ${s.size ?? ''} |\n`;
md += '\nThe app keeps invoices in memory only and has no backend, so no retries are configured.\n';
fs.writeFileSync(path.join(report, 'README.md'), md);
console.log(md);

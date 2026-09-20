/**
 * 文案应用工具：读取「文案对照表.csv」，把「新文字」列的内容写回代码
 *
 * 用法：
 *   node scripts/text-apply.mjs            # 正式应用
 *   node scripts/text-apply.mjs --dry-run  # 只检查不写入
 *
 * 安全措施：
 *   - 只处理「新文字」非空、且与「原文」不同的行
 *   - 找不到原文时跳过并在日志中列出，绝不乱改
 *   - 写入前会把原始文件备份到 _text-backup/
 *   - 应用后请运行 npm run build 验证
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DRY_RUN = process.argv.includes('--dry-run');
const BACKUP_DIR = path.join(ROOT, '_text-backup');
const LOG_FILE = path.join(ROOT, '文案应用日志.txt');

// ---------- 找 CSV ----------
const csvName = fs.readdirSync(ROOT).find((f) => f.endsWith('.csv') && f.includes('文案'));
if (!csvName) {
  console.error('找不到「文案对照表.csv」。请先运行 npm run text:export');
  process.exit(1);
}
const csvPath = path.join(ROOT, csvName);

// ---------- 解析 CSV（支持引号内换行、双引号转义） ----------
function parseCsv(text) {
  const src = text.replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

const table = parseCsv(fs.readFileSync(csvPath, 'utf-8'));
const header = table[0];
const idx = {
  page: header.indexOf('页面'),
  type: header.indexOf('类型'),
  loc: header.indexOf('位置'),
  original: header.indexOf('原文'),
  next: header.indexOf('新文字'),
};

if (idx.original === -1 || idx.next === -1 || idx.loc === -1) {
  console.error('CSV 表头不符合预期，需要包含：页面 / 类型 / 位置 / 原文 / 新文字');
  process.exit(1);
}

const dataRows = table.slice(1).filter((r) => r.length > idx.next);

// ---------- 收集要改的行 ----------
const changes = [];
let skippedEmpty = 0;
let skippedSame = 0;

for (const r of dataRows) {
  const original = r[idx.original] ?? '';
  const next = r[idx.next] ?? '';
  const loc = r[idx.loc] ?? '';

  if (!next.trim()) { skippedEmpty++; continue; }
  if (next === original) { skippedSame++; continue; }

  const lastColon = loc.lastIndexOf(':');
  const file = lastColon === -1 ? loc : loc.slice(0, lastColon);

  changes.push({ file, original, next, page: r[idx.page], loc });
}

// ---------- 应用 ----------
const log = [];
const applied = [];
const notFound = [];

const byFile = new Map();
for (const c of changes) {
  if (!byFile.has(c.file)) byFile.set(c.file, []);
  byFile.get(c.file).push(c);
}

for (const [file, items] of byFile) {
  const abs = path.join(ROOT, file);
  if (!fs.existsSync(abs)) {
    items.forEach((it) => notFound.push({ ...it, reason: '文件不存在' }));
    continue;
  }

  let src = fs.readFileSync(abs, 'utf-8');
  const originalSrc = src;

  for (const it of items) {
    const at = src.indexOf(it.original);
    if (at === -1) {
      notFound.push({ ...it, reason: '文件中找不到这段原文（可能已被改过或跨行）' });
      continue;
    }

    const before = src[at - 1];
    const after = src[at + it.original.length];
    let replacement = it.next;
    if (before === "'" && after === "'") replacement = replacement.replace(/'/g, "\\'");
    else if (before === '"' && after === '"') replacement = replacement.replace(/"/g, '\\"');
    else if (before === '`' && after === '`') replacement = replacement.replace(/`/g, '\\`');

    src = src.slice(0, at) + replacement + src.slice(at + it.original.length);
    applied.push(it);
  }

  if (src !== originalSrc && !DRY_RUN) {
    const backupAbs = path.join(BACKUP_DIR, file);
    fs.mkdirSync(path.dirname(backupAbs), { recursive: true });
    fs.writeFileSync(backupAbs, originalSrc, 'utf-8');
    fs.writeFileSync(abs, src, 'utf-8');
  }
}

// ---------- 报告 ----------
log.push(`文案应用${DRY_RUN ? '（预演，未写入）' : ''}`);
log.push(`CSV: ${csvName}`);
log.push(`可应用行数: ${applied.length}`);
log.push(`未找到: ${notFound.length}`);
log.push(`跳过（新文字为空）: ${skippedEmpty}`);
log.push(`跳过（新文字与原文相同）: ${skippedSame}`);
log.push('');

if (notFound.length > 0) {
  log.push('=== 未找到的条目（未改动）===');
  notFound.forEach((n) => log.push(`  [${n.page}] ${n.loc}\n     原文: ${n.original}\n     原因: ${n.reason}`));
  log.push('');
}

log.push('=== 已应用的条目 ===');
applied.forEach((a) => log.push(`  [${a.page}] ${a.loc}\n     ${a.original}\n  -> ${a.next}`));

fs.writeFileSync(LOG_FILE, log.join('\n'), 'utf-8');

console.log(`可应用: ${applied.length}`);
console.log(`未找到: ${notFound.length}`);
console.log(`跳过(空): ${skippedEmpty}`);
console.log(`跳过(未改): ${skippedSame}`);
console.log(`日志: 文案应用日志.txt`);
if (!DRY_RUN && applied.length > 0) {
  console.log(`备份: _text-backup/`);
  console.log('下一步请运行: npm run build');
}

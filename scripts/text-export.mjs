/**
 * 文案导出工具：扫描源码，把所有可编辑的中文文案导出为 CSV
 *
 * 用法：node scripts/text-export.mjs
 * 输出：文案对照表.csv（UTF-8 BOM，Excel 可直接打开）
 *
 * 注意：导出的每一行都记录了「原文」。改完稿后由 text-apply.mjs
 * 按「原文 -> 新文字」在对应文件里做精确替换，不需要你碰代码。
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const OUT_CSV = path.join(ROOT, '文案对照表.csv');

// 文件 -> 中文页面名（给非程序员看的）
const PAGE_LABELS = {
  'src/components/layout/Header.tsx': '顶部导航',
  'src/components/layout/Footer.tsx': '页脚',
  'src/components/layout/PageShell.tsx': '页面外壳',
  'src/components/common/TerminalStateSwitcher.tsx': '调试状态面板',
  'src/components/common/TerminalConnectModal.tsx': '连接终端弹窗',
  'src/components/common/SearchModal.tsx': '搜索弹窗',
  'src/components/common/NotificationDrawer.tsx': '通知抽屉',
  'src/components/common/AiConsultationModal.tsx': '智能咨询弹窗',
  'src/components/common/HumanAdvisorModal.tsx': '人工顾问弹窗',
  'src/components/common/AssetImage.tsx': '图片占位组件',
  'src/components/insurance/ClaimCard.tsx': '理赔卡片',
  'src/components/insurance/PolicyCard.tsx': '保单卡片',
  'src/components/insurance/PlanCard.tsx': '方案卡片',
  'src/components/insurance/CoverageOverviewCard.tsx': '保障概览卡片',
  'src/pages/HomePage.tsx': '首页',
  'src/pages/PublicHomePage.tsx': '首页（未连接）',
  'src/pages/PersonalHomePage.tsx': '首页（已连接）',
  'src/pages/CoveragePage.tsx': '我的保障页',
  'src/pages/PlansPage.tsx': '保障方案页',
  'src/pages/PlanDetailPage.tsx': '方案详情页',
  'src/pages/PoliciesPage.tsx': '我的保单页',
  'src/pages/PolicyDetailPage.tsx': '保单详情页',
  'src/pages/ClaimsPage.tsx': '理赔服务页',
  'src/pages/ClaimDetailPage.tsx': '理赔详情页',
  'src/pages/SupportPage.tsx': '客户服务页',
  'src/pages/AuthorizationsPage.tsx': '数据授权页',
  'src/pages/AppealsPage.tsx': '投诉申诉页',
  'src/pages/NewsPage.tsx': '新闻公告页',
  'src/pages/SitemapPage.tsx': '全站地图页',
  'src/pages/GenericSecondaryPage.tsx': '通用二级页',
  'src/pages/DebugWorkbenchPage.tsx': '调试工作台',
  'src/content/site.ts': '文案区 · 品牌与导航',
  'src/content/assets.ts': '文案区 · 图片资产',
  'src/content/pages/publicHome.ts': '文案区 · 首页（未连接）',
  'src/content/pages/personalHome.ts': '文案区 · 首页（已连接）',
  'src/content/pages/coverage.ts': '文案区 · 我的保障',
  'src/content/pages/plans.ts': '文案区 · 保障方案',
  'src/content/pages/policies.ts': '文案区 · 我的保单',
  'src/content/pages/claims.ts': '文案区 · 理赔服务',
  'src/content/pages/support.ts': '文案区 · 客户服务',
  'src/content/secondary/index.ts': '文案区 · 二级页',
};

function pageLabel(file) {
  return PAGE_LABELS[file] || file;
}

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, exts, out);
    else if (exts.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

const CJK = /[\u4e00-\u9fa5]/;
const isCommentLine = (t) =>
  t.startsWith('*') || t.startsWith('//') || t.startsWith('/*') || t.startsWith('*/');

/** 找出该行所有带中文的字符串字面量 */
function extractLiterals(line) {
  const results = [];
  const re = /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g;
  let m;
  while ((m = re.exec(line)) !== null) {
    const quote = m[1];
    const text = m[2];
    if (!CJK.test(text)) continue;
    if (text.length < 2) continue;
    results.push({ quote, text });
  }
  return results;
}

/** 找出 JSX 裸文字（>文字< 之间） */
function extractJsxText(line) {
  const results = [];
  const re = />([^<>{}]+)</g;
  let m;
  while ((m = re.exec(line)) !== null) {
    const raw = m[1];
    const text = raw.trim();
    if (!CJK.test(text) || text.length < 2) continue;
    results.push({ quote: null, text });
  }
  return results;
}

/**
 * 找出「独占一行」的 JSX 文字。
 * 例如：
 *   <p className="...">
 *     长垣人寿坚持透明阳光理赔……
 *   </p>
 * 这类文字不在 > < 之间，上面的 extractJsxText 抓不到。
 */
function extractOwnLineText(trimmed) {
  if (!trimmed) return null;
  // 去掉 {表达式} 插值
  const stripped = trimmed.replace(/\{[^{}]*\}/g, '').trim();
  if (!stripped || stripped.length < 2) return null;
  if (!CJK.test(stripped)) return null;
  // 含这些字符的看起来是代码而不是纯文案
  if (/[<>'"`=()[\]{}$;]/.test(stripped)) return null;
  return stripped;
}

/** 粗略判断类型，方便在 Excel 里筛选 */
function classify(file, text, line, isAttr) {
  // 含 ${...} 变量插值的，改文字时必须保留变量
  if (/\$\{/.test(text)) return '含变量·谨慎';
  if (isAttr) return '无障碍/提示';
  if (/aria-label|title=|placeholder|alt=/.test(line)) return '无障碍/提示';
  if (text.length >= 30) return '正文';
  if (/[？?]$/.test(text)) return '标题';
  if (text.length <= 6) return '按钮/短标签';
  return '标签';
}

const files = [
  ...walk(path.join(ROOT, 'src/components'), ['.tsx']),
  ...walk(path.join(ROOT, 'src/pages'), ['.tsx']),
  ...walk(path.join(ROOT, 'src/content'), ['.ts']),
];

const rows = [];
const seen = new Set();

for (const abs of files) {
  const rel = path.relative(ROOT, abs).split(path.sep).join('/');
  const src = fs.readFileSync(abs, 'utf-8');
  const lines = src.split(/\r?\n/);

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed || isCommentLine(trimmed)) return;
    if (!CJK.test(line)) return;

    const isTsx = rel.endsWith('.tsx');
    const found = isTsx
      ? [...extractLiterals(line), ...extractJsxText(line)]
      : extractLiterals(line);

    // 独占一行的 JSX 文案（仅 .tsx）
    if (isTsx) {
      const own = extractOwnLineText(trimmed);
      if (own && !found.some((f) => f.text === own)) {
        found.push({ quote: null, text: own });
      }
    }
    for (const f of found) {
      const key = `${rel}|${f.text}`;
      if (seen.has(key)) continue; // 同一文件同一句只收一次
      seen.add(key);
      rows.push({
        file: rel,
        page: pageLabel(rel),
        type: classify(rel, f.text, line, false),
        loc: `${rel}:${i + 1}`,
        original: f.text,
        quote: f.quote,
      });
    }
  });
}

// 排序：先按页面，再按位置
rows.sort((a, b) => (a.page + a.loc).localeCompare(b.page + b.loc, 'zh'));

// 写 CSV（UTF-8 BOM + 全字段引号）
function csvCell(v) {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

const header = ['序号', '页面', '类型', '位置', '原文', '新文字'];
const lines = [header.map(csvCell).join(',')];
rows.forEach((r, i) => {
  lines.push([i + 1, r.page, r.type, r.loc, r.original, ''].map(csvCell).join(','));
});

fs.writeFileSync(OUT_CSV, '\uFEFF' + lines.join('\r\n') + '\r\n', 'utf-8');

// 统计
const byPage = {};
for (const r of rows) byPage[r.page] = (byPage[r.page] || 0) + 1;
const byType = {};
for (const r of rows) byType[r.type] = (byType[r.type] || 0) + 1;

console.log('已导出:', path.relative(ROOT, OUT_CSV));
console.log('总行数:', rows.length);
console.log('');
console.log('按类型:');
Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
console.log('');
console.log('按页面（前 20）:');
Object.entries(byPage).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([k, v]) => console.log(`  ${v}\t${k}`));

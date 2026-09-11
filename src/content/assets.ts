/**
 * 【普通维护区】长垣人寿图片素材元数据表
 * 
 * 维护说明：
 * 1. 采用“固定文件名”策略：更换图片只需将新图命名为相同名称，上传覆盖 /public/assets/ 对应文件即可。
 * 2. 不需要修改代码中的 src 路径。
 * 3. 每一个图片位均包含完整的 AI 生图提示词 (prompt)，可直接复制使用。
 */

import { AssetMetadata } from '../types';

export const ASSET_LIST: AssetMetadata[] = [
  {
    id: 'logo-symbol',
    src: '/assets/changyuan-life/brand/logo-symbol.svg',
    usage: '全站品牌标识 Logo',
    recommendedSize: '160x40 px (SVG矢量优先)',
    alt: '长垣人寿品牌标识',
    status: 'placeholder',
    origin: 'CANON',
    prompt: 'Clean modern corporate logo icon for "Changyuan Life Insurance", featuring an elegant geometric shield intertwined with an organic leaf and bridge contour, deep corporate navy blue #123B70 and tranquil spruce green, minimalist, vector, high resolution, transparent background.'
  },
  {
    id: 'hero-public-home',
    src: '/assets/changyuan-life/hero/public-home.svg',
    usage: '未连接终端首页宽幅 Hero 视觉',
    recommendedSize: '1920x800 px (21:9 或 16:9)',
    alt: '2047年长垣新枢区金融港与长垣湖晨曦远景',
    status: 'ready',
    origin: 'WEB_DERIVED',
    prompt: 'A panoramic photograph of Changyuan City skyline in the year 2047 at tranquil morning dawn. In the distance, sleek biophilic skyscrapers of Xinshu Financial Port overlook the calm Changyuan lake and distant misty green hills. Clean urban skyways with silent magnetic rail transit glide smoothly. Warm morning sunlight casts a gentle golden-amber glow over sustainable glass architecture and tree-lined pedestrian waterfront parks. Natural editorial photography, Nikon Z9, realistic atmospheric depth, serene and stable civic atmosphere. Strictly avoid dark cyberpunk neon, no floating holographic HUDs, no glowing futuristic text.'
  },
  {
    id: 'hero-personal-home',
    src: '/assets/changyuan-life/hero/personal-home.jpg',
    usage: '已连接终端个人首页顶部氛围与生活图景',
    recommendedSize: '1600x600 px',
    alt: '长垣普通市民家庭在湖畔公园漫步晨练',
    status: 'ready',
    origin: 'WEB_DERIVED',
    prompt: 'A warm and genuine documentary-style photograph of a real multi-generational Chinese family taking an early morning stroll in Changyuan Lake Park in 2047. A middle-aged couple, their teenage daughter with a light sleek portable e-device, and a healthy grandfather smiling gently while doing morning calisthenics under weeping willows. Clean architectural pavilion in the background. Natural soft daylight, authentic candid expressions, peaceful and grounded modern life. No fake studio smiles, no robotic prosthetics, no neon glows.'
  },
  {
    id: 'hero-coverage',
    src: '/assets/changyuan-life/hero/coverage.jpg',
    usage: '我的保障页面 Hero 背景/插图',
    recommendedSize: '1440x500 px',
    alt: '市民日常生活与城市公共医疗服务站自然光景',
    status: 'placeholder',
    origin: 'WEB_DERIVED',
    prompt: 'Editorial lifestyle photography of a contemporary community health and wellness center in Changyuan residential district, 2047. Sun-drenched indoor courtyard with bamboo and gentle water features, courteous medical reception officers in dignified navy linen uniforms consulting with elderly resident. Atmosphere of mutual trust, dignity, transparency and civic care. Soft ambient sunlight, clean architectural lines. No sci-fi glowing laser scans, no complex sci-fi surgery robots, purely authentic civic care.'
  },
  {
    id: 'hero-plans',
    src: '/assets/changyuan-life/hero/plans.jpg',
    usage: '保障方案分类与生活场景导览主图',
    recommendedSize: '1440x500 px',
    alt: '长垣年轻职场人与工程师在科技园区交流工作',
    status: 'placeholder',
    origin: 'WEB_DERIVED',
    prompt: 'Photographic scene of two modern professionals in smart-casual linen shirts discussing outdoor field projects by an eco-tech urban terrace in Changyuan High-tech Hub, year 2047. One holds a slim transparent glass tablet displaying simple line diagrams. Background features lush vertical gardens and clean suburban air. Natural golden afternoon side-lighting, candid professional focus, trustworthy and pragmatic tone. No dark cyberpunk, no excessive holographic glare.'
  },
  {
    id: 'hero-policies',
    src: '/assets/changyuan-life/hero/policies.jpg',
    usage: '我的保单管理页面头图',
    recommendedSize: '1440x480 px',
    alt: '长垣居民书房内整洁的电子合同与生活剪影',
    status: 'placeholder',
    origin: 'WEB_DERIVED',
    prompt: 'Still life and lifestyle photography of a modern warm minimalist home study in Changyuan, 2047. Natural walnut wood desk, a small steaming cup of green tea, sunlight streaming through timber louvers. On the desk sits a thin paper-thin e-ink ledger displaying neat contractual text with the stamp "长垣人寿". Serene, orderly, reassuring, representing long-term contractual security and life protection. Hasselblad medium format color tone.'
  },
  {
    id: 'hero-claims',
    src: '/assets/changyuan-life/hero/claims.jpg',
    usage: '理赔服务流程与敏捷结算导览图',
    recommendedSize: '1440x480 px',
    alt: '事故互助与理赔专员在现场温和支持居民',
    status: 'placeholder',
    origin: 'WEB_DERIVED',
    prompt: 'Documentary photograph of a friendly female claims officer from Changyuan Life Insurance in a tailored dark blue trenchcoat handing a glass of warm water and a reassuring checklist to a relieved citizen near a pedestrian transit hub in Changyuan. Gentle overcast daytime light, respectful empathetic body language, practical civic assistance in action. Real human reliability over cold automation. Realistic street scene, clean asphalt, modern understated transit stop.'
  },
  {
    id: 'hero-support',
    src: '/assets/changyuan-life/hero/support.jpg',
    usage: '客户服务与线下网点咨询展示图',
    recommendedSize: '1440x480 px',
    alt: '长垣人寿新枢区营业厅宽敞明亮的接待区',
    status: 'placeholder',
    origin: 'WEB_DERIVED',
    prompt: 'Interior architectural photograph of Changyuan Life Customer Service Center in Xinshu District, 2047. Open, bright, welcoming lobby with light oak wood acoustic panels, comfortable fabric lounge chairs, and a round consultation table where an experienced senior advisor is attentively talking with a young family. Large floor-to-ceiling glass windows showing green park trees outside. Calm, transparent, highly respectable ambiance. No cold steel desks, no robotic guards.'
  },
  {
    id: 'advisor-linqiu',
    src: '/assets/changyuan-life/service/advisor-linqiu.jpg',
    usage: '专属客户服务顾问与重大事件专员头像',
    recommendedSize: '400x400 px',
    alt: '长垣人寿高级顾问林秋',
    status: 'placeholder',
    origin: 'CANON',
    prompt: 'Portrait photograph of Lin Qiu, a 34-year-old seasoned female insurance specialist at Changyuan Life in 2047. She wears a neat navy blue professional collar, friendly gentle eyes, a calm composed expression that conveys deep dependability and empathy. Clean soft-focus corporate backdrop with warm indoor lighting. Natural Asian skin texture, realistic portraiture, dignified and approachable.'
  }
];

// 辅助检索图片
export function getAsset(id: string): AssetMetadata {
  const found = ASSET_LIST.find(a => a.id === id);
  if (found) return found;
  return {
    id,
    src: `/assets/changyuan-life/placeholders/${id}.jpg`,
    usage: '通用占位图',
    recommendedSize: '800x600 px',
    prompt: `Clean editorial photograph representing ${id} in Changyuan City, 2047. Realistic, warm natural light.`,
    alt: '长垣人寿示意图',
    status: 'placeholder',
    origin: 'WEB_DERIVED'
  };
}

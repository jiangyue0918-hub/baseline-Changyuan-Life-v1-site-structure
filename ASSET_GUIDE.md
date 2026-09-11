# 长垣人寿 (2047) 视觉资产与 AI 生图指南

> **文件定位**：全站所有插图、摄影图与头像资源的维护规范与 AI 提示词库。  
> **关联代码**：`src/content/assets.ts` & `src/components/common/AssetImage.tsx`

---

## 一、本地高质感降级占位机制

为了避免前期未投入真实商业摄影或 AI 资产交付前出现“图片红叉破版”、“空白塌陷”或“破损图标”，本项目构建了完备的 **自动降级占位机制**：

1. **工作原理**：
   - 页面中的图片统一通过 `<AssetImage assetId="..." />` 渲染；
   - `AssetImage` 会自动从 `src/content/assets.ts` 读取该资产的元数据（包括中文名、推荐比例、使用场景、生成提示词）；
   - 如果图片尚未放置到 `/public/assets/...` 或网络加载失败，系统会自动渲染带有优雅边框、规范比例、提示词预览的高保真占位块，确保**布局严整、比例分毫不差、无任何视觉瑕疵**。

2. **如何替换为正式图片**：
   - 使用下方列出的 Prompt 在 Midjourney 或 Google Imagen 3 生成图片；
   - 将图片保存为标准 WebP / PNG / JPG 格式，放入 `public/assets/` 对应路径（或直接配置绝对 URL）；
   - 在 `src/content/assets.ts` 中将对应资产的 `src` 字段填入实际路径即可。

---

## 二、全站核心视觉资产清单与生图提示词 (Prompt Library)

### 1. 首页宽幅主视觉摄影 (`hero-city-skyline`)
- **资产ID**：`hero-city-skyline`
- **使用位置**：未连接首页 (`/`) 宽幅品牌 Hero 右侧展示区
- **推荐比例**：`16:9` 或 `4:3` (最小分辨率 1920x1080)
- **视觉基调**：晨光或黄昏下的 2047 长垣城市风貌。干净、通透、秩序、充满生活气息，蓝灰与暖白主色调。**严禁赛博朋克深紫暗夜和刺眼霓虹**。
- **生图 Prompt (Midjourney / Imagen 3)**：
  ```
  Architectural photography of Changyuan modern eco-city in year 2047, quiet morning sunlight, sustainable glass towers with vertical hanging gardens, clean elevated autonomous sky-transit, peaceful pedestrian plazas below with lush ginkgo trees, calm atmosphere, realistic architectural digest photography, shot on Hasselblad H6D-100c, 8k resolution, elegant, no cyberpunk, no neon, no dark dystopia --ar 16:9 --style raw
  ```

---

### 2. 专属服务专员头像摄影 (`advisor-linqiu`)
- **资产ID**：`advisor-linqiu`
- **使用位置**：已连接首页专员卡片、客户支持专员区、在线人工沟通弹窗
- **推荐比例**：`1:1` (正方形，最小 512x512)
- **人物设定**：林秋，女性，约 36 岁，长垣人寿资深客户顾问。神态亲切从容、专业可信赖，身着浅灰/藏青色剪裁利落的现代商务职业装。
- **生图 Prompt**：
  ```
  Professional portrait photography of an experienced Chinese female life insurance advisor, named Lin Qiu, mid-30s, warm genuine smile, approachable and trustworthy expression, wearing a tailored modern navy blue blazer with a minimalist silver lapel pin, soft neutral studio lighting, subtle clean blurred office background with warm natural sunlight, corporate portrait, high-end commercial photography, sharp focus on eyes, 8k --ar 1:1
  ```

---

### 3. 当前登录居民头像 (`user-chenmohan`)
- **资产ID**：`user-chenmohan`
- **使用位置**：顶部导航已连接状态、个人空间弹窗
- **推荐比例**：`1:1` (正方形，最小 256x256)
- **人物设定**：陈墨涵，男性，32 岁，长垣未来智能制造研究院工程师。干净整洁、温和专注的青年学者形象。
- **生图 Prompt**：
  ```
  Close-up portrait of a 32-year-old Chinese male research engineer, Chen Mohan, wearing minimalist matte glasses and a high-neck dark grey merino sweater, smart and gentle expression, daylight coming from side window, natural skin texture, documentary realism portrait, 4k --ar 1:1
  ```

---

### 4. 三层保障全貌概念主图 (`coverage-shield`)
- **资产ID**：`coverage-shield`
- **使用位置**：“我的保障” (`/coverage`) 页面 Hero 视觉区
- **推荐比例**：`16:9`
- **视觉基调**：以平静有力的几何秩序、建筑层叠感表现“城市法定兜底、动态共享额度、商业补充契约”的三层守护，蓝白交融、轻盈安全。
- **生图 Prompt**：
  ```
  Minimalist 3D architectural representation of social security and human protection layers, interlocking translucent sapphire and crystalline glass planes forming a protective architectural structure, bathed in calm morning light, serene and safe feeling, clean porcelain and frosted glass textures, product rendering by Dieter Rams style, warm clean studio background, elegant, no neon --ar 16:9
  ```

---

### 5. 保障方案概念图 (`plans-hero`)
- **资产ID**：`plans-hero`
- **使用位置**：“保障方案” (`/plans`) 页面 Hero 视觉区
- **推荐比例**：`16:9`
- **视觉基调**：长垣多元市民生活图景（青年独立工作者、三代同堂家庭、银发漫步）。
- **生图 Prompt**：
  ```
  Candid documentary photography of diverse generations living peacefully in modern Changyuan, a young father playing with toddler while elderly grandparents sit comfortably in a sunny urban garden terrace, natural emotions, natural soft lighting, warm modern family life, shot on Leica M11, cinematic realism --ar 16:9
  ```

---

### 6. 我的保单凭据概念图 (`policies-vault`)
- **资产ID**：`policies-vault`
- **使用位置**：“我的保单” (`/policies`) 页面 Hero 视觉区
- **推荐比例**：`16:9`
- **视觉基调**：契约、锁价、信赖与时间刻度。
- **生图 Prompt**：
  ```
  Still life photography representing timeless contract and financial security, a sleek brushed titanium personal digital credential device resting on an oak desk next to an embossed fine linen insurance document and a cup of warm tea, gentle side sunlight, focus on texture and craftsmanship, serene, premium editorial --ar 16:9
  ```

---

### 7. 理赔关怀与直赔网络图 (`claims-care`)
- **资产ID**：`claims-care`
- **使用位置**：“理赔服务” (`/claims`) 页面 Hero 视觉区
- **推荐比例**：`16:9`
- **视觉基调**：现代长垣公立医疗中心，医护人员专注看护，环境宁静舒缓，体现人性关怀与专业温度。
- **生图 Prompt**：
  ```
  Atmospheric photography inside a state-of-the-art modern public hospital in Changyuan, warm wooden accents, wide floor-to-ceiling windows with green bamboo garden outside, compassionate healthcare worker walking with a recovering patient, dignified, warm, quiet, reassurance and high efficiency, photojournalism style --ar 16:9
  ```

---

### 8. 客户服务网点柜台图 (`support-counter`)
- **资产ID**：`support-counter`
- **使用位置**：“服务支持” (`/support`) 页面 Hero 视觉区
- **推荐比例**：`16:9`
- **视觉基调**：长垣新枢区营业厅真实服务场景，开敞温馨，柜台专员与居民面对面耐心交流。
- **生图 Prompt**：
  ```
  Interior architectural photography of a customer service lounge of Changyuan Life Insurance, warm Scandinavian-meets-East Asian interior design, comfortable acoustic armchairs, open consultation tables, natural light pouring in, calm consultation between professional advisor and citizen, inviting and dignified ambiance --ar 16:9
  ```

---

## 三、视觉与风格红线审查清单

在为本站准备任何图片时，请对照以下红线自查：

- [x] **色彩红线**：严禁使用高饱和度紫红调、霓虹青绿、强光眩光。主基调应为海军蓝 (`#123B70`)、普鲁士蓝 (`#1C5FB8`)、暖灰白 (`#F4F8FC`) 与生机绿 (`#1FA866`)。
- [x] **风格红线**：禁止赛博朋克机械臂义体打斗、浮空全息屏幕满屏乱飞。长垣人寿是一家稳重扎根的城市民生保险机构，未来感体现在**社会运行的高效、流程的极简与人际关系的尊严**，而非视觉混乱。
- [x] **真实感**：摄影图片应当具备真实的光学虚化、自然皮肤肌理与真实空气透视感，避免油腻塑料材质渲染。

/**
 * 【普通维护区】保障方案产品库与场景推荐配置
 * 
 * 维护说明：
 * 1. 营销名称、保额、示例价格均为 WEB_DERIVED，可以直接调整。
 * 2. 严禁改动六大主营类别划分（规范 3.2 硬性规定）。
 * 3. 产品详情按“先讲生活问题与覆盖，后讲法律合同”结构设计。
 */

import { PlanItem } from '../../types';

export const PLANS_PAGE_CONTENT = {
  hero: {
    badge: '长垣人寿保障方案库',
    title: '按真实生活场景，挑选合适保障',
    description: '不论是初入职场的青年、刚组建家庭的新人，还是为长辈规划照护，我们用普通人听得懂的语言讲清每一份保障。不搞套路推销，支持合同期内严格锁价。',
    assetId: 'hero-plans'
  },
  tabs: [
    { id: 'all', label: '全部方案' },
    { id: 'scenario', label: '按生活场景' },
    { id: 'life_income', label: '生命与收入' },
    { id: 'health_medical', label: '健康医疗' },
    { id: 'family', label: '家庭共享' },
    { id: 'elderly_care', label: '养老照护' },
    { id: 'employee', label: '企业员工' },
    { id: 'pilot_innovation', label: '创新试点' }
  ],
  scenarioHelper: {
    title: '不知道选哪个？告诉我你的生活计划',
    subtitle: '输入近期计划或担忧，智能顾问为你对照已有覆盖，分析未覆盖风险与合适选项',
    placeholder: '例如：下周去外地出差三天，需要补什么保障？或：刚结婚如何规划家庭保额？',
    defaultPromptExamples: [
      '下周去外地出差三天，需要补什么保障？',
      '家里添了宝宝，怎么配置家庭共享医疗？',
      '父母今年刚满62岁，想补充长垣本地照护津贴',
      '我是自由职业独立开发者，怎么补齐基础收入保障？'
    ]
  }
};

// 产品列表（含详细条款与通俗说明）
export const PLAN_ITEMS: PlanItem[] = [
  {
    id: 'p-01',
    slug: 'changqing-critical-income',
    name: '长青人身重大疾病与收入替代保障',
    officialContractName: '长垣人寿定期人身重大疾病收入保障保险（2047版-A款）',
    category: 'life_income',
    categoryLabel: '个人生命与收入',
    solveWhat: '解决一旦突发严重伤病，长达半年至两年无法工作期间的家庭按揭、子女抚养与生活现金流断裂问题。',
    covers: [
      '确诊合同约定重症后一次性给付约定保额（不问实际发票花销）',
      '因治疗导致持续丧失劳动力超过90天，按月发放康复生活津贴',
      '长垣市内定点三甲及康复医院绿色转诊协助与专家专案跟进'
    ],
    notCovers: [
      '投保前已明确知悉且刻意隐瞒的既往重症病史',
      '未经法定授权许可的高危违法活动所致伤害',
      '普通门急诊无需住院且不影响劳动能力的轻微疾病'
    ],
    coverageAmount: '基本定额赔付 500,000 - 1,200,000 信用额',
    duration: '保障至70周岁或终身可选',
    lockPriceRule: '核保后费率在所选合同期内完全锁定，中途不得因单人健康状况变化或索赔历史而单独涨价。',
    pricing: '约 128 / 月起（按30岁标准体测算）',
    targetAudience: '家庭经济支柱、有按揭贷款负债的在职员工与自雇人士',
    scenarioTags: ['家庭顶梁柱', '防断供', '大病现金流'],
    features: ['定额即付', '合同锁价', '真人专员跟进'],
    hasExistingOverlap: '与城市第一层公费救治不冲突；本金为一次性自由支配信托款，主要补充误工费。',
    origin: 'WEB_DERIVED'
  },
  {
    id: 'p-02',
    slug: 'anju-medical-supplement',
    name: '安居百万自费健康医疗补充',
    officialContractName: '长垣人寿团体及个人补充医疗费用补偿保险（综合型）',
    category: 'health_medical',
    categoryLabel: '健康医疗',
    solveWhat: '解决在长垣市第二层公共动态医疗额度报销后，自费靶向药、高精尖微创耗材及特需住院床位的高额自付压力。',
    covers: [
      '自费药品与自费诊疗耗材阶梯报销（最高报销比例达95%）',
      '住院日额护理与营养津贴补贴',
      '长垣新枢区医学中心先垫付后结算直赔服务'
    ],
    notCovers: [
      '纯美容、整形及与疾病治疗无关的营养保健支出',
      '未获长垣卫健部门合规认证的非法实验性非医用技术'
    ],
    coverageAmount: '年度累计最高承担 3,000,000 医疗补充',
    duration: '1年期（承诺保证续保周期内锁费率规则）',
    lockPriceRule: '按年龄段公布费率表，同一费率组费率透明统一，不得单独针对理赔用户上浮保费。',
    pricing: '约 45 / 月起',
    targetAudience: '已有公共动态医保、希望就医不为新特药与高端床位担忧的全体居民',
    scenarioTags: ['就医自费减免', '靶向药直赔', '全家可用'],
    features: ['医院免押金垫付', '可信节点无感报销', '全城三甲通用'],
    hasExistingOverlap: '必须先经过第二层公共医疗额度核销，剩余个人自费合规部分由本计划承保。',
    origin: 'WEB_DERIVED'
  },
  {
    id: 'p-03',
    slug: 'jiayuan-family-shared-pool',
    name: '家园多代共享家庭互助保障池',
    officialContractName: '长垣人寿多被保险人家庭共享责任保险（2047版）',
    category: 'family',
    categoryLabel: '家庭共享',
    solveWhat: '解决家庭中老人或孩子突发意外开支超出单人额度时，全家成员保障额度相互割裂无法互助的痛点。',
    covers: [
      '最多登记6位直系亲属，建立全家总额度互通互用池',
      '老人骨折滑倒、少儿意外烫伤及居家财产突发责任统筹承保',
      '家庭首席健康顾问上门进行居家环境跌倒隐患评估'
    ],
    notCovers: [
      '未在系统合法完成亲属关系登记的第三方人员借用额度',
      '家庭成员之间故意人为制造的民事伤害'
    ],
    coverageAmount: '全家累计最高 2,000,000 共享保额',
    duration: '按年签约，支持随家庭人口变化动态增减成员',
    lockPriceRule: '家庭包干制总价，登记成员人数变动仅按阶梯调整，锁定基础家庭费率。',
    pricing: '约 168 / 月（3口之家全包价）',
    targetAudience: '上有老下有小的三代同堂家庭，或注重亲情互助的联络家庭',
    scenarioTags: ['全家共享', '老人意外', '少儿呵护', '一单保全家'],
    features: ['额度动态调剂', '免除繁复单买', '家庭健康顾问'],
    origin: 'WEB_DERIVED'
  },
  {
    id: 'p-04',
    slug: 'yikang-elderly-care-pension',
    name: '颐康长垣长期照护与养老年金',
    officialContractName: '长垣人寿终身照护与护理年金保险（服务型）',
    category: 'elderly_care',
    categoryLabel: '养老与长期照护',
    solveWhat: '解决进入高龄失能或半失能状态后，专业护理人员每月高昂支出以及优质养老社区一床难求的后顾之忧。',
    covers: [
      '经医学评估进入照护状态后，终身按月给付照护服务津贴',
      '长垣市优质定点康养社区优先入住权与照料管家跟进',
      '失智阿尔茨海默家庭关怀辅助与日间照料补贴'
    ],
    notCovers: [
      '非因病因残导致的纯度假旅居消费',
      '故意自伤或吸食违禁品造成的身体机能衰竭'
    ],
    coverageAmount: '每月给付 3,500 - 8,000 照护津贴 + 终身保证',
    duration: '终身保障',
    lockPriceRule: '保费分期缴清后终身享受权益，领取标准与长垣市护工平均人工基准指数联动。',
    pricing: '定制分期缴费，建议及早规划',
    targetAudience: '40岁以上为自身未来退休规划、或为高龄父母筹备专业看护的子女',
    scenarioTags: ['长辈照护', '品质养老', '月度生活金', '定点社区'],
    features: ['资金+服务双托底', '居家照料上门', '抗通胀联动'],
    origin: 'WEB_DERIVED'
  },
  {
    id: 'p-05',
    slug: 'qiye-linghang-employee',
    name: '企安领航·企业员工法定与自选福利',
    officialContractName: '长垣人寿雇主责任与雇员自选福利团体保险方案',
    category: 'employee',
    categoryLabel: '企业员工保障',
    solveWhat: '帮助长垣各类企业合规满足法定雇主责任险要求，同时允许员工按自身需要自主升级高保额与家属附加险。',
    covers: [
      '工伤与工作场所猝死法定赔付快速垫付，减轻企业现金流压力',
      '上下班通勤与因公派驻异地突发意外医疗无免赔报销',
      '企业数字后台与个人终端一键授权关联，离职权益支持自由携转'
    ],
    notCovers: [
      '企业未如实申报用工人数导致未实名登记人员的因私事故',
      '严重违反安全生产法规作业导致的责任事故'
    ],
    coverageAmount: '法定工伤最高 1,000,000 / 自选部分灵活叠加',
    duration: '企业按年团购，员工个人权益在职期间连续有效',
    lockPriceRule: '企业年度雇员规模合规核算锁定，离职人员自动退费解约。',
    pricing: '由企业全额出资法定部分，个人自选补充享受企业集采团购价',
    targetAudience: '长垣本地制造企业、金融港科创团队、物流运输及商贸公司',
    scenarioTags: ['法定合规', '离职可携转', '通勤双保障', '团购优惠'],
    features: ['雇主法定义务', '员工自选升级', '线上实时增员'],
    origin: 'WEB_DERIVED'
  },
  {
    id: 'p-06',
    slug: 'xinhang-low-altitude-pilot',
    name: '新航低空通勤与创新生活试点保障',
    officialContractName: '长垣人寿特定新出行方式人身意外短期试点附加险（报备案号：CY-PILOT-2047-09）',
    category: 'pilot_innovation',
    categoryLabel: '创新试点',
    solveWhat: '面向2047年长垣新启用的低空穿梭磁浮接驳、智能无人通勤网等新场景，提供针对性的高空应急施救与特定延误意外保障。',
    covers: [
      '新型交通工具设备异常或紧急迫降导致的人身软组织挫伤救治',
      '突发气象管制导致的滞留应急安置与交通补偿',
      '长垣低空急救网格直升救援响应零免赔全额承担'
    ],
    notCovers: [
      '未经民航或长垣低空空域管理局备案的黑飞载具乘坐行为',
      '恶意妨碍交通管制设备所致的人身损害'
    ],
    coverageAmount: '单次行程最高 300,000 救援与医疗补偿',
    duration: '支持按单次行程购买或按月订阅',
    lockPriceRule: '试点项目依法报备，价格严格受监管试点价格上限约束。',
    pricing: '单次 3.5 信用额 / 月度卡 29 信用额',
    targetAudience: '常往返于新枢区与各外围产业区之间的低空通勤通勤族',
    scenarioTags: ['试点报备', '新型通勤', '即时生效', '按次随买'],
    features: ['合规创新试点', '低空紧急救援', '按次按月灵活'],
    isPilot: true,
    origin: 'WEB_DERIVED'
  }
];

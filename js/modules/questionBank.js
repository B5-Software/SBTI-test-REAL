const SCENE_SNIPPETS = [
  '通勤地铁上',
  '深夜刷短视频时',
  '和朋友聚餐后',
  '被领导临时加需求时',
  '周末宅家时',
  '打游戏连跪后',
  '节前最后一个工作日',
  '收到群消息99+时',
  '商场排队结账时',
  '计划被临时打断时',
  '和家人聊天时',
  '独自散步时',
  '出门旅行前一天',
  '睡前复盘今天时',
  '遇到突发尴尬场面时',
  '社交局散场后',
  '预算吃紧时',
  '面对新机会时',
  '被误解之后',
  '需要做决定时'
];

export function buildQuestionBankByDimension(seedQuestions, dimensionOrder, targetTotal = 300) {
  const grouped = seedQuestions.reduce((acc, q) => {
    if (!q.dim) return acc;
    if (!acc[q.dim]) acc[q.dim] = [];
    acc[q.dim].push(q);
    return acc;
  }, {});

  const perDim = Math.floor(targetTotal / dimensionOrder.length);
  const remainder = targetTotal % dimensionOrder.length;
  const generated = [];

  dimensionOrder.forEach((dim, dimIdx) => {
    const seeds = grouped[dim] || [];
    if (seeds.length === 0) return;
    const targetCount = perDim + (dimIdx < remainder ? 1 : 0);

    for (let i = 0; i < targetCount; i++) {
      const source = seeds[i % seeds.length];
      const variant = Math.floor(i / seeds.length) + 1;
      const scene = SCENE_SNIPPETS[i % SCENE_SNIPPETS.length];
      generated.push({
        ...source,
        id: `${source.id}_g${variant}_${i + 1}_${dim}`,
        text: `${source.text}（${scene}）`,
        options: source.options.map(opt => ({ ...opt }))
      });
    }
  });

  return generated.slice(0, targetTotal);
}

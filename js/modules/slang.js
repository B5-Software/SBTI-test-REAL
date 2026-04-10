const VIBE_TAILS = [
  '主打一个拿捏住了。',
  '这波属于稳定发挥。',
  '你这状态，属实有点东西。',
  '懂的都懂，不懂的慢慢懂。',
  '气质这块，已经安排到位。'
];

function hashSeed(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickTail(seedText) {
  const idx = hashSeed(seedText) % VIBE_TAILS.length;
  return VIBE_TAILS[idx];
}

export function buildVibeSub(baseSub, typeCode, similarity) {
  const rankTone = similarity >= 85
    ? '像开了人格雷达，命中率很顶。'
    : similarity >= 70
      ? '匹配度在线，画像很能打。'
      : '边缘试探成功，风格依旧清晰。';
  return `${baseSub} ${rankTone} ${pickTail(`${typeCode}-${similarity}`)}`;
}

export function buildFunNote(special) {
  return special
    ? '娱乐向整活项目，请勿当诊断依据。隐藏人格/兜底人格是故意埋的梗，图一乐就好，别上纲上线。'
    : '娱乐向整活项目，结果仅供哈哈一笑与自我观察，别当成现实判决器，稳住心态最重要。';
}

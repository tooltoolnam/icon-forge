export function extractColors(imageData, count = 8) {
  const data = imageData.data;
  const len = data.length;
  const colorMap = {};
  const step = Math.max(1, Math.floor(len / (4 * 20000)));

  for (let i = 0; i < len; i += 4 * step) {
    const r = Math.round(data[i] / 16) * 16;
    const g = Math.round(data[i + 1] / 16) * 16;
    const b = Math.round(data[i + 2] / 16) * 16;
    const a = data[i + 3];
    if (a < 128) continue;
    const key = `${r},${g},${b}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
  }

  const sorted = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count * 4);

  const filtered = [];
  for (const [key] of sorted) {
    const [r, g, b] = key.split(",").map(Number);
    const isDuplicate = filtered.some(([fr, fg, fb]) => {
      return Math.abs(r - fr) + Math.abs(g - fg) + Math.abs(b - fb) < 40;
    });
    if (!isDuplicate) {
      filtered.push([r, g, b]);
    }
    if (filtered.length >= count) break;
  }

  return filtered.map(([r, g, b]) => `rgb(${r},${g},${b})`);
}

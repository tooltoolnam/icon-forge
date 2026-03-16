export function drawIcon(canvas, img, bgColor, shape, size, padding, offsetX = 0, offsetY = 0) {
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, size, size);

  if (shape === "rounded") {
    const r = size * 0.22;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(size - r, 0);
    ctx.quadraticCurveTo(size, 0, size, r);
    ctx.lineTo(size, size - r);
    ctx.quadraticCurveTo(size, size, size - r, size);
    ctx.lineTo(r, size);
    ctx.quadraticCurveTo(0, size, 0, size - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.clip();
  } else if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
  }

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  const pad = size * padding;
  const drawSize = size - pad * 2;
  const imgAspect = img.width / img.height;
  let dw, dh, dx, dy;

  if (imgAspect > 1) {
    dw = drawSize;
    dh = drawSize / imgAspect;
  } else {
    dh = drawSize;
    dw = drawSize * imgAspect;
  }
  dx = (size - dw) / 2 + size * offsetX;
  dy = (size - dh) / 2 + size * offsetY;

  ctx.drawImage(img, dx, dy, dw, dh);
}

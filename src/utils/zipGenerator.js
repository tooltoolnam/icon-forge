import { ICON_SIZES } from "./iconSizes";
import { drawIcon } from "./iconRenderer";

// Draw background-only image (solid color fill)
function drawBgOnly(canvas, bgColor, size) {
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);
}

// Draw monochrome (grayscale silhouette) icon — adaptive icon layer
function drawMono(canvas, img, size, padding, offsetX = 0, offsetY = 0) {
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);

  // Adaptive icon safe zone: 18% on each side
  const adaptivePadding = 0.18;
  const totalPadding = adaptivePadding + padding * 0.667;
  const pad = size * totalPadding;
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
  dx = (size - dw) / 2 + size * offsetX * 0.667;
  dy = (size - dh) / 2 + size * offsetY * 0.667;
  ctx.drawImage(img, dx, dy, dw, dh);

  // Convert to grayscale
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);
}

// Draw Android adaptive icon foreground layer
// Android crops foreground to center 66.67% (72dp of 108dp canvas)
// So we add ~18% extra padding on each side to compensate
function drawForeground(canvas, img, bgColor, size, padding, offsetX = 0, offsetY = 0) {
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Adaptive icon safe zone: 18% on each side (108dp canvas, 72dp visible)
  const adaptivePadding = 0.18;
  const totalPadding = adaptivePadding + padding * 0.667;
  const pad = size * totalPadding;
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
  dx = (size - dw) / 2 + size * offsetX * 0.667;
  dy = (size - dh) / 2 + size * offsetY * 0.667;
  ctx.drawImage(img, dx, dy, dw, dh);
}

// Draw maskable icon (with safe zone padding)
function drawMaskable(canvas, img, bgColor, size, padding, offsetX = 0, offsetY = 0) {
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Maskable icons need extra safe zone (at least 10% on each side)
  const maskablePadding = Math.max(padding, 0.1);
  const pad = size * maskablePadding;
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

// Generate favicon.ico (32x32) from canvas
async function generateFavicon(canvas, img, bgColor, shape, padding, offsetX = 0, offsetY = 0) {
  drawIcon(canvas, img, bgColor, shape, 32, padding, offsetX, offsetY);
  const pngBlob = await new Promise((res) => canvas.toBlob(res, "image/png"));
  const pngBuf = new Uint8Array(await pngBlob.arrayBuffer());

  // ICO file format: header + directory entry + PNG data
  const header = new Uint8Array(6);
  const hv = new DataView(header.buffer);
  hv.setUint16(0, 0, true);     // Reserved
  hv.setUint16(2, 1, true);     // Type: ICO
  hv.setUint16(4, 1, true);     // Count: 1 image

  const dirEntry = new Uint8Array(16);
  const dv = new DataView(dirEntry.buffer);
  dv.setUint8(0, 32);           // Width
  dv.setUint8(1, 32);           // Height
  dv.setUint8(2, 0);            // Color palette
  dv.setUint8(3, 0);            // Reserved
  dv.setUint16(4, 1, true);     // Color planes
  dv.setUint16(6, 32, true);    // Bits per pixel
  dv.setUint32(8, pngBuf.length, true);  // Image size
  dv.setUint32(12, 22, true);   // Offset (6 + 16 = 22)

  const ico = new Uint8Array(22 + pngBuf.length);
  ico.set(header, 0);
  ico.set(dirEntry, 6);
  ico.set(pngBuf, 22);
  return ico;
}

// Generate iOS Contents.json
function generateContentsJson(iosEntries) {
  const images = iosEntries.map((entry) => ({
    filename: `${entry.name}.png`,
    idiom: entry.idiom,
    scale: entry.scale,
    size: entry.pt,
  }));
  return JSON.stringify(
    { images, info: { author: "IconForge", version: 1 } },
    null,
    2
  );
}

// Generate Android adaptive icon XML
function generateAdaptiveIconXml() {
  return `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
  <background android:drawable="@mipmap/ic_launcher_background"/>
  <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
  <monochrome android:drawable="@mipmap/ic_launcher_monochrome"/>
</adaptive-icon>`;
}

// Generate web README.txt
function generateWebReadme() {
  return `Add this to your HTML <head>:

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

Add this to your app's manifest.json:

    ...
    {
      "icons": [
        { "src": "/favicon.ico", "type": "image/x-icon", "sizes": "16x16 32x32" },
        { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
        { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" },
        { "src": "/icon-192-maskable.png", "type": "image/png", "sizes": "192x192", "purpose": "maskable" },
        { "src": "/icon-512-maskable.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable" }
      ]
    }
    ...

Generated by IconForge (https://tooltoolnam.github.io/icon-forge/)`;
}

export async function generateZip(img, bgColor, shape, padding, platforms, offsetX = 0, offsetY = 0) {
  const files = [];
  const canvas = document.createElement("canvas");

  // Root level 1024.png (high-res universal icon)
  drawIcon(canvas, img, bgColor, shape, 1024, padding, offsetX, offsetY);
  const rootBlob = await new Promise((res) => canvas.toBlob(res, "image/png"));
  files.push({
    name: "1024-icon.png",
    data: new Uint8Array(await rootBlob.arrayBuffer()),
  });

  // Android
  if (platforms.includes("android")) {
    const androidSizes = ICON_SIZES.android;
    for (const entry of androidSizes) {
      const path = entry.folder
        ? `android/${entry.folder}/${entry.name}.png`
        : `android/${entry.name}.png`;

      if (entry.bgOnly) {
        drawBgOnly(canvas, bgColor, entry.size);
      } else if (entry.mono) {
        drawMono(canvas, img, entry.size, padding, offsetX, offsetY);
      } else if (entry.foreground) {
        drawForeground(canvas, img, bgColor, entry.size, padding, offsetX, offsetY);
      } else {
        drawIcon(canvas, img, bgColor, shape, entry.size, padding, offsetX, offsetY);
      }
      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
      files.push({ name: path, data: new Uint8Array(await blob.arrayBuffer()) });
    }

    // ic_launcher.xml
    const xmlContent = generateAdaptiveIconXml();
    files.push({
      name: "android/res/mipmap-anydpi-v26/ic_launcher.xml",
      data: new TextEncoder().encode(xmlContent),
    });
  }

  // iOS
  if (platforms.includes("ios")) {
    const iosSizes = ICON_SIZES.ios;
    for (const entry of iosSizes) {
      drawIcon(canvas, img, bgColor, shape, entry.size, padding, offsetX, offsetY);
      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
      files.push({
        name: `ios/${entry.name}.png`,
        data: new Uint8Array(await blob.arrayBuffer()),
      });
    }

    // Contents.json
    const contentsJson = generateContentsJson(iosSizes);
    files.push({
      name: "ios/Contents.json",
      data: new TextEncoder().encode(contentsJson),
    });
  }

  // Web
  if (platforms.includes("web")) {
    const webSizes = ICON_SIZES.web;
    for (const entry of webSizes) {
      if (entry.type === "ico") {
        const icoData = await generateFavicon(canvas, img, bgColor, shape, padding, offsetX, offsetY);
        files.push({ name: `web/${entry.name}.ico`, data: icoData });
      } else if (entry.maskable) {
        drawMaskable(canvas, img, bgColor, entry.size, padding, offsetX, offsetY);
        const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
        files.push({
          name: `web/${entry.name}.png`,
          data: new Uint8Array(await blob.arrayBuffer()),
        });
      } else {
        drawIcon(canvas, img, bgColor, shape, entry.size, padding, offsetX, offsetY);
        const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
        files.push({
          name: `web/${entry.name}.png`,
          data: new Uint8Array(await blob.arrayBuffer()),
        });
      }
    }

    // README.txt
    files.push({
      name: "web/README.txt",
      data: new TextEncoder().encode(generateWebReadme()),
    });
  }

  // Build ZIP
  buildAndDownloadZip(files, "IconForge-icons.zip");
}

function buildAndDownloadZip(files, filename) {
  const encoder = new TextEncoder();

  function dosDateTime() {
    const now = new Date();
    const time =
      ((now.getHours() & 0x1f) << 11) |
      ((now.getMinutes() & 0x3f) << 5) |
      ((now.getSeconds() >> 1) & 0x1f);
    const date =
      (((now.getFullYear() - 1980) & 0x7f) << 9) |
      (((now.getMonth() + 1) & 0xf) << 5) |
      (now.getDate() & 0x1f);
    return { time, date };
  }

  function crc32(data) {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
      crc ^= data[i];
      for (let j = 0; j < 8; j++) {
        crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  const { time, date } = dosDateTime();
  const parts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const crc = crc32(file.data);

    // Local file header
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(localHeader.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, time, true);
    lv.setUint16(12, date, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, file.data.length, true);
    lv.setUint32(22, file.data.length, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    localHeader.set(nameBytes, 30);

    // Central directory header
    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(centralHeader.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, time, true);
    cv.setUint16(14, date, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, file.data.length, true);
    cv.setUint32(24, file.data.length, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    centralHeader.set(nameBytes, 46);

    parts.push(localHeader, file.data);
    centralParts.push(centralHeader);
    offset += localHeader.length + file.data.length;
  }

  const centralStart = offset;
  let centralSize = 0;
  for (const c of centralParts) centralSize += c.length;

  const endRecord = new Uint8Array(22);
  const ev = new DataView(endRecord.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, centralStart, true);

  const blob = new Blob([...parts, ...centralParts, endRecord], {
    type: "application/zip",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

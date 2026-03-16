/**
 * Remove white/light background from an image using flood fill from edges.
 * Only removes connected white regions touching the image border,
 * preserving internal white areas.
 * @param {HTMLImageElement} img - Source image element
 * @param {number} tolerance - How close to white a pixel must be to be removed (0-100)
 * @returns {Promise<HTMLImageElement>} - New image with transparent background
 */
export function removeWhiteBackground(img, tolerance = 30) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const t = tolerance * 4.42;

    const visited = new Uint8Array(w * h);

    const isWhitish = (idx) => {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const dist = Math.sqrt(
        (255 - r) * (255 - r) +
        (255 - g) * (255 - g) +
        (255 - b) * (255 - b)
      );
      return dist < t;
    };

    const softAlpha = (idx) => {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const dist = Math.sqrt(
        (255 - r) * (255 - r) +
        (255 - g) * (255 - g) +
        (255 - b) * (255 - b)
      );
      if (dist < t * 0.7) {
        return 0;
      }
      return Math.round((dist - t * 0.7) / (t * 0.3) * data[idx + 3]);
    };

    // BFS flood fill from all edge pixels
    const queue = [];

    // Seed with all border pixels that are whitish
    for (let x = 0; x < w; x++) {
      const topIdx = x;
      const botIdx = (h - 1) * w + x;
      if (!visited[topIdx] && isWhitish(topIdx * 4)) {
        visited[topIdx] = 1;
        queue.push(topIdx);
      }
      if (!visited[botIdx] && isWhitish(botIdx * 4)) {
        visited[botIdx] = 1;
        queue.push(botIdx);
      }
    }
    for (let y = 0; y < h; y++) {
      const leftIdx = y * w;
      const rightIdx = y * w + (w - 1);
      if (!visited[leftIdx] && isWhitish(leftIdx * 4)) {
        visited[leftIdx] = 1;
        queue.push(leftIdx);
      }
      if (!visited[rightIdx] && isWhitish(rightIdx * 4)) {
        visited[rightIdx] = 1;
        queue.push(rightIdx);
      }
    }

    // BFS
    let head = 0;
    while (head < queue.length) {
      const pos = queue[head++];
      const x = pos % w;
      const y = (pos - x) / w;

      // Make this pixel transparent
      data[pos * 4 + 3] = softAlpha(pos * 4);

      // Check 4 neighbors
      const neighbors = [];
      if (x > 0) neighbors.push(pos - 1);
      if (x < w - 1) neighbors.push(pos + 1);
      if (y > 0) neighbors.push(pos - w);
      if (y < h - 1) neighbors.push(pos + w);

      for (const n of neighbors) {
        if (!visited[n] && isWhitish(n * 4)) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    const newImg = new Image();
    newImg.onload = () => resolve(newImg);
    newImg.src = canvas.toDataURL("image/png");
  });
}

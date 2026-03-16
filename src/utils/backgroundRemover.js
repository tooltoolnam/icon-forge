/**
 * Remove white/light background from an image by making matching pixels transparent.
 * @param {HTMLImageElement} img - Source image element
 * @param {number} tolerance - How close to white a pixel must be to be removed (0-100)
 * @returns {Promise<HTMLImageElement>} - New image with transparent background
 */
export function removeWhiteBackground(img, tolerance = 30) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const t = tolerance * 4.42; // scale 0-100 to ~0-442 (max distance from white = sqrt(255²*3) ≈ 441.67)

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Distance from pure white (255, 255, 255)
      const dist = Math.sqrt(
        (255 - r) * (255 - r) +
        (255 - g) * (255 - g) +
        (255 - b) * (255 - b)
      );
      if (dist < t) {
        // Make transparent, with soft edge for anti-aliasing
        if (dist < t * 0.7) {
          data[i + 3] = 0; // Fully transparent
        } else {
          // Gradual fade at the edge
          data[i + 3] = Math.round((dist - t * 0.7) / (t * 0.3) * data[i + 3]);
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    const newImg = new Image();
    newImg.onload = () => resolve(newImg);
    newImg.src = canvas.toDataURL("image/png");
  });
}

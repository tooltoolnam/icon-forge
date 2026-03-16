import { useRef, useEffect } from "react";
import { drawIcon } from "../utils/iconRenderer";
import { t } from "../utils/i18n";

function SmallPreview({ imgEl, bgColor, shape, padding, offsetX, offsetY, displaySize }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    drawIcon(canvasRef.current, imgEl, bgColor, shape, displaySize * 2, padding, offsetX, offsetY);
  }, [imgEl, bgColor, shape, padding, offsetX, offsetY, displaySize]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: displaySize,
          height: displaySize,
          borderRadius:
            shape === "circle"
              ? "50%"
              : shape === "rounded"
                ? "22%"
                : 2,
          boxShadow: "0 2px 8px var(--shadow-sm)",
        }}
      />
      <span
        style={{
          fontSize: 10,
          color: "var(--text-muted)",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        {displaySize}
      </span>
    </div>
  );
}

export default function Preview({
  imgEl,
  bgColor,
  shape,
  padding,
  offsetX = 0,
  offsetY = 0,
  onReset,
  lang,
}) {
  const previewRef = useRef(null);

  useEffect(() => {
    if (!imgEl || !previewRef.current) return;
    drawIcon(previewRef.current, imgEl, bgColor, shape, 512, padding, offsetX, offsetY);
  }, [imgEl, bgColor, shape, padding, offsetX, offsetY]);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: 20,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 32,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <canvas
            ref={previewRef}
            style={{
              width: 200,
              height: 200,
              borderRadius:
                shape === "circle"
                  ? "50%"
                  : shape === "rounded"
                    ? "22%"
                    : 4,
              boxShadow: "0 8px 32px var(--shadow)",
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: "var(--text-dim)",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            512 × 512
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          {[128, 96, 64, 48, 32].map((s) => (
            <SmallPreview
              key={s}
              imgEl={imgEl}
              bgColor={bgColor}
              shape={shape}
              padding={padding}
              offsetX={offsetX}
              offsetY={offsetY}
              displaySize={s}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        style={{
          padding: "6px 14px",
          borderRadius: 8,
          border: "1px solid var(--border-input)",
          background: "transparent",
          color: "var(--text-sub)",
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        {t("changeImage", lang)}
      </button>
    </div>
  );
}

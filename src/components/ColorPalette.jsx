import { useState } from "react";
import { t } from "../utils/i18n";

export default function ColorPalette({ colors, bgColor, onColorSelect, onAddColor, lang }) {
  const [customColor, setCustomColor] = useState("#ffffff");

  const handleCustomColorChange = (e) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onColorSelect(newColor);
  };

  const handleCustomColorConfirm = () => {
    const exists = colors.some((c) => c === customColor);
    if (!exists && onAddColor) {
      onAddColor(customColor);
    }
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: 16,
        padding: 24,
      }}
    >
      <h3
        style={{
          fontSize: 13,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "var(--text-sub)",
          margin: 0,
          marginBottom: 16,
        }}
      >
        {t("colorPalette", lang)}
      </h3>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        {colors.map((c, i) => (
          <button
            key={i}
            onClick={() => onColorSelect(c)}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: c,
              border:
                bgColor === c
                  ? "3px solid var(--border-active)"
                  : "3px solid transparent",
              cursor: "pointer",
              boxShadow:
                bgColor === c
                  ? "0 0 0 2px rgba(129,140,248,0.3)"
                  : "var(--swatch-border)",
              transition: "all 0.15s",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={c}
          >
            {bgColor === c && (
              <span style={{ fontSize: 16, filter: "var(--check-filter)" }}>
                ✓
              </span>
            )}
          </button>
        ))}

        <div style={{ position: "relative" }}>
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            onBlur={handleCustomColorConfirm}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 48,
              height: 48,
              opacity: 0,
              cursor: "pointer",
            }}
          />
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              border: "2px dashed var(--drop-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "var(--text-dim)",
              pointerEvents: "none",
            }}
          >
            +
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: "var(--text-dim)",
        }}
      >
        <span>{t("selectedBg", lang)}</span>
        <span
          style={{
            display: "inline-block",
            width: 16,
            height: 16,
            borderRadius: 4,
            background: bgColor,
            border: "1px solid var(--color-label)",
          }}
        />
        <span style={{ fontFamily: "'Space Mono', monospace" }}>{bgColor}</span>
      </div>
    </div>
  );
}

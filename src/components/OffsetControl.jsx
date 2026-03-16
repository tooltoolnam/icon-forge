import { t } from "../utils/i18n";
import RangeSlider from "./RangeSlider";

export default function OffsetControl({ offsetX, offsetY, onOffsetXChange, onOffsetYChange, lang }) {
  const reset = () => {
    onOffsetXChange(0);
    onOffsetYChange(0);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <h3
          style={{
            fontSize: 13,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: "var(--text-sub)",
            margin: 0,
          }}
        >
          {t("imagePosition", lang)}
        </h3>
        {(offsetX !== 0 || offsetY !== 0) && (
          <button
            onClick={reset}
            style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 6,
              border: "1px solid var(--border-input)",
              background: "transparent",
              color: "var(--text-dim)",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {t("resetPosition", lang)}
          </button>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* X axis */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "var(--text-dim)",
              marginBottom: 4,
            }}
          >
            <span>{t("horizontal", lang)} (X)</span>
            <span style={{ fontFamily: "'Space Mono', monospace" }}>
              {offsetX >= 0 ? "+" : ""}{Math.round(offsetX * 100)}%
            </span>
          </div>
          <RangeSlider
            min={-0.5}
            max={0.5}
            step={0.01}
            value={offsetX}
            onChange={(e) => onOffsetXChange(parseFloat(e.target.value))}
            style={{ width: "100%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              color: "var(--text-muted)",
              marginTop: 2,
            }}
          >
            <span>← {t("left", lang)}</span>
            <span>{t("right", lang)} →</span>
          </div>
        </div>

        {/* Y axis */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "var(--text-dim)",
              marginBottom: 4,
            }}
          >
            <span>{t("vertical", lang)} (Y)</span>
            <span style={{ fontFamily: "'Space Mono', monospace" }}>
              {offsetY >= 0 ? "+" : ""}{Math.round(offsetY * 100)}%
            </span>
          </div>
          <RangeSlider
            min={-0.5}
            max={0.5}
            step={0.01}
            value={offsetY}
            onChange={(e) => onOffsetYChange(parseFloat(e.target.value))}
            style={{ width: "100%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              color: "var(--text-muted)",
              marginTop: 2,
            }}
          >
            <span>↑ {t("up", lang)}</span>
            <span>{t("down", lang)} ↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

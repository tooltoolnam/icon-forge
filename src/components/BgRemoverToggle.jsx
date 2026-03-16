import { t } from "../utils/i18n";
import RangeSlider from "./RangeSlider";

export default function BgRemoverToggle({ removeBg, onToggle, tolerance, onToleranceChange, lang }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: removeBg ? 12 : 0,
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
          }}
        >
          {t("removeBg", lang)}
        </h3>

        {/* Toggle switch */}
        <button
          onClick={onToggle}
          style={{
            width: 44,
            height: 24,
            borderRadius: 12,
            border: "none",
            background: removeBg
              ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
              : "var(--range-track)",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#fff",
              position: "absolute",
              top: 3,
              left: removeBg ? 23 : 3,
              transition: "left 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        </button>
      </div>

      {removeBg && (
        <>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-dim)",
              marginBottom: 10,
              lineHeight: 1.4,
            }}
          >
            {t("removeBgDesc", lang)}
          </div>

          <div style={{ marginBottom: 4 }}>
            <span
              style={{
                fontSize: 11,
                color: "var(--text-sub)",
                fontWeight: 500,
              }}
            >
              {t("tolerance", lang)}: {tolerance}
            </span>
          </div>

          <RangeSlider
            min={5}
            max={80}
            step={1}
            value={tolerance}
            onChange={(e) => onToleranceChange(parseInt(e.target.value))}
            style={{ width: "100%", marginTop: 4 }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              color: "var(--text-muted)",
              marginTop: 4,
            }}
          >
            <span>{t("toleranceLow", lang)}</span>
            <span>{t("toleranceHigh", lang)}</span>
          </div>
        </>
      )}
    </div>
  );
}

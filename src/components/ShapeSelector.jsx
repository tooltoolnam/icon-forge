import { SHAPES } from "../utils/iconSizes";
import { t } from "../utils/i18n";

const SHAPE_KEYS = {
  square: "square",
  rounded: "rounded",
  circle: "circle",
};

export default function ShapeSelector({ shape, onShapeChange, lang }) {
  return (
    <div>
      <h3
        style={{
          fontSize: 13,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "var(--text-sub)",
          margin: 0,
          marginBottom: 12,
        }}
      >
        {t("iconShape", lang)}
      </h3>
      <div style={{ display: "flex", gap: 8 }}>
        {SHAPES.map((s) => (
          <button
            key={s.id}
            onClick={() => onShapeChange(s.id)}
            style={{
              flex: 1,
              padding: "12px 8px",
              borderRadius: 10,
              border:
                shape === s.id
                  ? "2px solid var(--border-active)"
                  : "2px solid var(--border-input)",
              background:
                shape === s.id ? "var(--accent-bg)" : "transparent",
              color:
                shape === s.id ? "var(--accent-text)" : "var(--text-sub)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 500,
              transition: "all 0.15s",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            {t(SHAPE_KEYS[s.id], lang)}
          </button>
        ))}
      </div>
    </div>
  );
}

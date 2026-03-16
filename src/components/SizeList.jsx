import { ICON_SIZES_SUMMARY } from "../utils/iconSizes";
import { t } from "../utils/i18n";

export default function SizeList({ platforms, lang }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: 16,
        padding: 20,
        maxHeight: 300,
        overflowY: "auto",
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
          marginBottom: 14,
        }}
      >
        {t("iconList", lang)}
      </h3>
      {platforms.map((p) => (
        <div key={p} style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--accent-badge-text)",
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            {p}
          </div>
          {ICON_SIZES_SUMMARY[p].map(({ name, size }) => (
            <div
              key={name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
                fontSize: 12,
                color: "var(--text-sub)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span>{name}</span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                }}
              >
                {size}
              </span>
            </div>
          ))}
        </div>
      ))}
      {platforms.length === 0 && (
        <p
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            textAlign: "center",
            padding: 16,
          }}
        >
          {t("selectPlatform", lang)}
        </p>
      )}
    </div>
  );
}

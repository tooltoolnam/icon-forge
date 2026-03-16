import { ICON_FILE_COUNTS } from "../utils/iconSizes";
import { t } from "../utils/i18n";

const PLATFORM_LABELS = {
  android: "Android",
  ios: "iOS",
  web: "Web",
};

export default function PlatformPicker({ platforms, onTogglePlatform, lang }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: 16,
        padding: 20,
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
        {t("outputPlatform", lang)}
      </h3>
      {Object.keys(ICON_FILE_COUNTS).map((p) => (
        <label
          key={p}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 10,
            marginBottom: 6,
            cursor: "pointer",
            background: platforms.includes(p)
              ? "var(--accent-bg-dim)"
              : "transparent",
            border: `1px solid ${platforms.includes(p) ? "rgba(99,102,241,0.2)" : "var(--border-input)"}`,
            transition: "all 0.15s",
          }}
        >
          <input
            type="checkbox"
            checked={platforms.includes(p)}
            onChange={() => onTogglePlatform(p)}
            style={{ accentColor: "#818cf8" }}
          />
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            {PLATFORM_LABELS[p]}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 11,
              color: "var(--text-muted)",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {ICON_FILE_COUNTS[p]}{t("countSuffix", lang)}
          </span>
        </label>
      ))}
    </div>
  );
}

import { t } from "../utils/i18n";
import RangeSlider from "./RangeSlider";

export default function PaddingSlider({ padding, onPaddingChange, lang }) {
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
        {t("padding", lang)} ({padding >= 0 ? "+" : ""}{Math.round(padding * 100)}%)
      </h3>
      <RangeSlider
        min={-0.5}
        max={0.5}
        step={0.01}
        value={padding}
        onChange={(e) => onPaddingChange(parseFloat(e.target.value))}
        style={{
          width: "100%",
          marginTop: 16,
        }}
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
        <span>{t("cropZoom", lang)}</span>
        <span>{t("spacious", lang)}</span>
      </div>
    </div>
  );
}

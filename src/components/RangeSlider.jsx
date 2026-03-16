import { useMemo, useCallback } from "react";

const btnStyle = {
  width: 28,
  height: 28,
  borderRadius: 8,
  border: "1px solid var(--border-input)",
  background: "transparent",
  color: "var(--text-sub)",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Space Mono', monospace",
  flexShrink: 0,
  transition: "all 0.1s",
  lineHeight: 1,
};

export default function RangeSlider({ min, max, step, value, onChange, style }) {
  const percent = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const trackStyle = useMemo(() => ({
    flex: 1,
    ...style,
    background: `linear-gradient(to right, #818cf8 0%, #818cf8 ${percent}%, var(--range-track) ${percent}%, var(--range-track) 100%)`,
  }), [percent, style]);

  const nudge = useCallback((delta) => {
    const next = Math.min(max, Math.max(min, parseFloat((value + delta).toFixed(4))));
    onChange({ target: { value: String(next) } });
  }, [value, min, max, onChange]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button
        type="button"
        onClick={() => nudge(-step)}
        style={btnStyle}
        title={`-${step}`}
      >
        −
      </button>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={trackStyle}
      />
      <button
        type="button"
        onClick={() => nudge(step)}
        style={btnStyle}
        title={`+${step}`}
      >
        +
      </button>
    </div>
  );
}

import { useRef, useEffect } from "react";
import { drawIcon } from "../utils/iconRenderer";
import { t } from "../utils/i18n";

function MockupIcon({ imgEl, bgColor, shape, padding, offsetX, offsetY, size }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    drawIcon(canvasRef.current, imgEl, bgColor, shape, size * 2, padding, offsetX, offsetY);
  }, [imgEl, bgColor, shape, padding, offsetX, offsetY, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        borderRadius:
          shape === "circle"
            ? "50%"
            : shape === "rounded"
              ? "22%"
              : 3,
      }}
    />
  );
}

function AppSlot({ bgColor: slotBg, shape, size }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius:
            shape === "circle"
              ? "50%"
              : shape === "rounded"
                ? "22%"
                : 3,
          background: slotBg,
        }}
      />
    </div>
  );
}

export default function DeviceMockup({ imgEl, bgColor, shape, padding, offsetX = 0, offsetY = 0, lang }) {
  const iconSize = 40;

  const dummyApps = [
    { bg: "#34c759" },
    { bg: "#30d158" },
    { bg: "#636366" },
    { bg: "#ff9f0a" },
    { bg: "#8e8e93" },
    { bg: "#30d158" },
    { bg: "#fc3c44" },
  ];

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
        {t("devicePreview", lang)}
      </h3>

      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        {/* Light mode device */}
        <div
          style={{
            width: 170,
            borderRadius: 24,
            background: "linear-gradient(180deg, #e8e8ed 0%, #f2f2f7 100%)",
            padding: "24px 14px 14px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, padding: "0 2px" }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#1c1c1e" }}>9:41</span>
            <div style={{ display: "flex", gap: 3 }}>
              <div style={{ width: 12, height: 7, borderRadius: 2, background: "#1c1c1e" }} />
              <div style={{ width: 16, height: 7, borderRadius: 2, background: "#1c1c1e" }} />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              justifyItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <MockupIcon imgEl={imgEl} bgColor={bgColor} shape={shape} padding={padding} offsetX={offsetX} offsetY={offsetY} size={iconSize} />
              <span style={{ fontSize: 8, color: "#1c1c1e", fontWeight: 500 }}>My App</span>
            </div>
            {dummyApps.map((app, i) => (
              <AppSlot key={i} bgColor={app.bg} shape={shape} size={iconSize} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 12, fontSize: 9, fontWeight: 700, color: "#8e8e93", letterSpacing: "1px" }}>
            LIGHT
          </div>
        </div>

        {/* Dark mode device */}
        <div
          style={{
            width: 170,
            borderRadius: 24,
            background: "linear-gradient(180deg, #1c1c1e 0%, #000000 100%)",
            padding: "24px 14px 14px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, padding: "0 2px" }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#f2f2f7" }}>9:41</span>
            <div style={{ display: "flex", gap: 3 }}>
              <div style={{ width: 12, height: 7, borderRadius: 2, background: "#f2f2f7" }} />
              <div style={{ width: 16, height: 7, borderRadius: 2, background: "#f2f2f7" }} />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              justifyItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <MockupIcon imgEl={imgEl} bgColor={bgColor} shape={shape} padding={padding} offsetX={offsetX} offsetY={offsetY} size={iconSize} />
              <span style={{ fontSize: 8, color: "#f2f2f7", fontWeight: 500 }}>My App</span>
            </div>
            {dummyApps.map((app, i) => (
              <AppSlot key={i} bgColor={app.bg} shape={shape} size={iconSize} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 12, fontSize: 9, fontWeight: 700, color: "#636366", letterSpacing: "1px" }}>
            DARK
          </div>
        </div>
      </div>
    </div>
  );
}

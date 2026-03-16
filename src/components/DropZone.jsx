import { useRef, useCallback, useState } from "react";
import { t } from "../utils/i18n";

export default function DropZone({ onFileSelect, lang }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback(
    (file) => {
      if (!file || !file.type.startsWith("image/")) return;
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const features = [
    { icon: "📱", key: "featureMultiPlatform" },
    { icon: "🎨", key: "featureAutoColor" },
    { icon: "⚡", key: "featureFast" },
  ];

  return (
    <>
      {/* Hero section */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            margin: 0,
            marginBottom: 8,
            letterSpacing: "-1px",
            background: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("heroTitle", lang)}
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-dim)",
            margin: 0,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          {t("heroDesc", lang)}
        </p>
      </div>

      {/* Drop area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? "var(--border-active)" : "var(--drop-border)"}`,
          borderRadius: 24,
          padding: "60px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          cursor: "pointer",
          background: dragOver ? "var(--accent-bg-dim)" : "var(--drop-bg)",
          transition: "all 0.3s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow behind icon */}
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            pointerEvents: "none",
          }}
        />

        {/* Upload icon */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            background: "linear-gradient(135deg, var(--accent-bg), var(--accent-bg-dim))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            position: "relative",
            boxShadow: "0 4px 24px rgba(99,102,241,0.15)",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <div style={{ textAlign: "center", position: "relative" }}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 0,
              marginBottom: 6,
            }}
          >
            {t("dropTitle", lang)}
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-dim)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            {t("dropDesc", lang)}
          </p>

          {/* CTA-like button hint */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 20px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0 2px 12px rgba(99,102,241,0.3)",
            }}
          >
            {t("browseFiles", lang)}
          </div>
        </div>
      </div>

      {/* Features row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginTop: 8,
        }}
      >
        {features.map((f) => (
          <div
            key={f.key}
            style={{
              background: "var(--bg-card)",
              borderRadius: 14,
              padding: "20px 16px",
              textAlign: "center",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              {t(f.key + "Title", lang)}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-dim)",
                lineHeight: 1.5,
              }}
            >
              {t(f.key + "Desc", lang)}
            </div>
          </div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </>
  );
}

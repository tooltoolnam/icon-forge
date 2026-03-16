import { useState, useCallback, useEffect } from "react";
import DropZone from "./components/DropZone";
import ColorPalette from "./components/ColorPalette";
import ShapeSelector from "./components/ShapeSelector";
import PaddingSlider from "./components/PaddingSlider";
import OffsetControl from "./components/OffsetControl";
import PlatformPicker from "./components/PlatformPicker";
import Preview from "./components/Preview";
import SizeList from "./components/SizeList";
import DeviceMockup from "./components/DeviceMockup";
import BgRemoverToggle from "./components/BgRemoverToggle";
import { extractColors } from "./utils/colorExtractor";
import { generateZip } from "./utils/zipGenerator";
import { removeWhiteBackground } from "./utils/backgroundRemover";
import { ICON_FILE_COUNTS } from "./utils/iconSizes";
import { t, detectLanguage, LANGUAGES } from "./utils/i18n";

export default function App() {
  const [image, setImage] = useState(null);
  const [imgEl, setImgEl] = useState(null);
  const [colors, setColors] = useState([]);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [shape, setShape] = useState("rounded");
  const [padding, setPadding] = useState(0.15);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [platforms, setPlatforms] = useState(["android", "ios", "web"]);
  const [generating, setGenerating] = useState(false);
  const [theme, setTheme] = useState(() => {
    document.documentElement.setAttribute("data-theme", "light");
    return "light";
  });
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState(() => detectLanguage());
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [removeBg, setRemoveBg] = useState(false);
  const [bgTolerance, setBgTolerance] = useState(30);
  const [processedImgEl, setProcessedImgEl] = useState(null);

  // Process image when removeBg or tolerance changes
  useEffect(() => {
    if (!imgEl) return;
    if (!removeBg) {
      setProcessedImgEl(null);
      return;
    }
    removeWhiteBackground(imgEl, bgTolerance).then(setProcessedImgEl);
  }, [imgEl, removeBg, bgTolerance]);

  // The image to use for rendering (processed or original)
  const activeImg = removeBg && processedImgEl ? processedImgEl : imgEl;

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFileSelect = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImgEl(img);
        setImage(e.target.result);

        const canvas = document.createElement("canvas");
        const maxSample = 200;
        const scale = Math.min(
          1,
          maxSample / Math.max(img.width, img.height)
        );
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const extracted = extractColors(imageData);
        setColors(extracted);
        if (extracted.length > 0) setBgColor(extracted[0]);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAddColor = (color) => {
    setColors((prev) => [...prev, color]);
  };

  const handleReset = () => {
    setImage(null);
    setImgEl(null);
    setColors([]);
    setBgColor("#ffffff");
    setOffsetX(0);
    setOffsetY(0);
    setRemoveBg(false);
    setProcessedImgEl(null);
  };

  const togglePlatform = (p) => {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleGenerate = async () => {
    if (!activeImg) return;
    setGenerating(true);
    try {
      await generateZip(activeImg, bgColor, shape, padding, platforms, offsetX, offsetY);
    } catch (err) {
      console.error(err);
    }
    setGenerating(false);
  };

  const totalIcons = platforms.reduce(
    (a, p) => a + ICON_FILE_COUNTS[p],
    0
  );

  const headerBtnStyle = {
    height: 36,
    borderRadius: 10,
    border: "none",
    background: "var(--header-btn-bg)",
    color: "var(--header-btn-text)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    transition: "all 0.15s",
    fontFamily: "inherit",
    padding: "0 12px",
    gap: 6,
    fontWeight: 500,
  };

  const currentLangLabel = LANGUAGES.find((l) => l.code === lang)?.label;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "'DM Sans', 'Pretendard', sans-serif",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}icon.svg`}
          alt="IconForge"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
          }}
        />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          IconForge
        </span>
        <span
          style={{
            fontSize: 11,
            padding: "3px 8px",
            borderRadius: 99,
            background: "var(--accent-badge-bg)",
            color: "var(--accent-badge-text)",
            fontWeight: 600,
            marginLeft: 4,
          }}
        >
          {t("beta", lang)}
        </span>

        {/* Right side buttons */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          {/* Language dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangMenuOpen((v) => !v)}
              title={t("language", lang)}
              style={headerBtnStyle}
            >
              🌐 {currentLangLabel}
            </button>
            {langMenuOpen && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 999 }}
                  onClick={() => setLangMenuOpen(false)}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    right: 0,
                    background: "var(--header-btn-bg)",
                    border: "1px solid var(--border, #e0e0e0)",
                    borderRadius: 8,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    zIndex: 1000,
                    minWidth: 150,
                    overflow: "hidden",
                  }}
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%",
                        padding: "8px 14px",
                        border: "none",
                        background: l.code === lang ? "var(--accent-badge-bg)" : "transparent",
                        color: l.code === lang ? "var(--accent-badge-text)" : "var(--header-btn-text)",
                        cursor: "pointer",
                        fontSize: 13,
                        fontFamily: "inherit",
                        fontWeight: l.code === lang ? 600 : 400,
                        textAlign: "left",
                      }}
                    >
                      <span style={{ width: 24, fontWeight: 600 }}>{l.label}</span>
                      {l.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Copy link */}
          <button onClick={copyLink} title={t("copyLink", lang)} style={headerBtnStyle}>
            {copied ? "✓" : "🔗"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? t("lightMode", lang) : t("darkMode", lang)}
            style={headerBtnStyle}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: image ? "1fr 340px" : "1fr",
          gap: 32,
        }}
      >
        {/* Main area */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {!image ? (
            <DropZone onFileSelect={handleFileSelect} lang={lang} />
          ) : (
            <>
              <Preview
                imgEl={activeImg}
                bgColor={bgColor}
                shape={shape}
                padding={padding}
                offsetX={offsetX}
                offsetY={offsetY}
                onReset={handleReset}
                lang={lang}
              />

              <ColorPalette
                colors={colors}
                bgColor={bgColor}
                onColorSelect={setBgColor}
                onAddColor={handleAddColor}
                lang={lang}
              />

              <div
                style={{
                  background: "var(--bg-card)",
                  borderRadius: 16,
                  padding: 24,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                }}
              >
                <ShapeSelector shape={shape} onShapeChange={setShape} lang={lang} />
                <PaddingSlider
                  padding={padding}
                  onPaddingChange={setPadding}
                  lang={lang}
                />
                <div style={{ gridColumn: "1 / -1" }}>
                  <BgRemoverToggle
                    removeBg={removeBg}
                    onToggle={() => setRemoveBg((v) => !v)}
                    tolerance={bgTolerance}
                    onToleranceChange={setBgTolerance}
                    lang={lang}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <OffsetControl
                    offsetX={offsetX}
                    offsetY={offsetY}
                    onOffsetXChange={setOffsetX}
                    onOffsetYChange={setOffsetY}
                    lang={lang}
                  />
                </div>
              </div>

              <DeviceMockup
                imgEl={activeImg}
                bgColor={bgColor}
                shape={shape}
                padding={padding}
                offsetX={offsetX}
                offsetY={offsetY}
                lang={lang}
              />
            </>
          )}
        </div>

        {/* Sidebar */}
        {image && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <PlatformPicker
              platforms={platforms}
              onTogglePlatform={togglePlatform}
              lang={lang}
            />

            <SizeList platforms={platforms} lang={lang} />

            <button
              onClick={handleGenerate}
              disabled={generating || platforms.length === 0}
              style={{
                padding: "16px 24px",
                borderRadius: 14,
                border: "none",
                background:
                  generating || platforms.length === 0
                    ? "var(--btn-disabled-bg)"
                    : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color:
                  generating || platforms.length === 0
                    ? "var(--btn-disabled-text)"
                    : "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor:
                  generating || platforms.length === 0
                    ? "not-allowed"
                    : "pointer",
                boxShadow:
                  generating || platforms.length === 0
                    ? "none"
                    : "0 4px 20px rgba(99,102,241,0.3)",
                transition: "all 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {generating
                ? t("generating", lang)
                : `${t("downloadZip", lang)} (${totalIcons}${t("iconsCount", lang)})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

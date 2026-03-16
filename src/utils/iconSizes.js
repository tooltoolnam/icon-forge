// Android: mipmap 폴더 구조 + adaptive icon (foreground/background/monochrome)
// iOS: AppIcon 네이밍 + Contents.json
// Web: favicon.ico, apple-touch-icon, PWA icons (normal + maskable)

export const ICON_SIZES = {
  android: [
    // mipmap-mdpi
    { name: "ic_launcher", folder: "res/mipmap-mdpi", size: 48 },
    { name: "ic_launcher_foreground", folder: "res/mipmap-mdpi", size: 48, foreground: true },
    { name: "ic_launcher_background", folder: "res/mipmap-mdpi", size: 48, bgOnly: true },
    { name: "ic_launcher_monochrome", folder: "res/mipmap-mdpi", size: 48, mono: true },
    // mipmap-hdpi
    { name: "ic_launcher", folder: "res/mipmap-hdpi", size: 72 },
    { name: "ic_launcher_foreground", folder: "res/mipmap-hdpi", size: 72, foreground: true },
    { name: "ic_launcher_background", folder: "res/mipmap-hdpi", size: 72, bgOnly: true },
    { name: "ic_launcher_monochrome", folder: "res/mipmap-hdpi", size: 72, mono: true },
    // mipmap-xhdpi
    { name: "ic_launcher", folder: "res/mipmap-xhdpi", size: 96 },
    { name: "ic_launcher_foreground", folder: "res/mipmap-xhdpi", size: 96, foreground: true },
    { name: "ic_launcher_background", folder: "res/mipmap-xhdpi", size: 96, bgOnly: true },
    { name: "ic_launcher_monochrome", folder: "res/mipmap-xhdpi", size: 96, mono: true },
    // mipmap-xxhdpi
    { name: "ic_launcher", folder: "res/mipmap-xxhdpi", size: 144 },
    { name: "ic_launcher_foreground", folder: "res/mipmap-xxhdpi", size: 144, foreground: true },
    { name: "ic_launcher_background", folder: "res/mipmap-xxhdpi", size: 144, bgOnly: true },
    { name: "ic_launcher_monochrome", folder: "res/mipmap-xxhdpi", size: 144, mono: true },
    // mipmap-xxxhdpi
    { name: "ic_launcher", folder: "res/mipmap-xxxhdpi", size: 192 },
    { name: "ic_launcher_foreground", folder: "res/mipmap-xxxhdpi", size: 192, foreground: true },
    { name: "ic_launcher_background", folder: "res/mipmap-xxxhdpi", size: 192, bgOnly: true },
    { name: "ic_launcher_monochrome", folder: "res/mipmap-xxxhdpi", size: 192, mono: true },
    // Play Store
    { name: "play_store_512", folder: "", size: 512 },
  ],
  ios: [
    // iPhone
    { name: "AppIcon@2x", size: 120, idiom: "iphone", scale: "2x", pt: "60x60" },
    { name: "AppIcon@3x", size: 180, idiom: "iphone", scale: "3x", pt: "60x60" },
    { name: "AppIcon-40@2x", size: 80, idiom: "iphone", scale: "2x", pt: "40x40" },
    { name: "AppIcon-40@3x", size: 120, idiom: "iphone", scale: "3x", pt: "40x40" },
    { name: "AppIcon-20@2x", size: 40, idiom: "iphone", scale: "2x", pt: "20x20" },
    { name: "AppIcon-20@3x", size: 60, idiom: "iphone", scale: "3x", pt: "20x20" },
    { name: "AppIcon-29", size: 29, idiom: "iphone", scale: "1x", pt: "29x29" },
    { name: "AppIcon-29@2x", size: 58, idiom: "iphone", scale: "2x", pt: "29x29" },
    { name: "AppIcon-29@3x", size: 87, idiom: "iphone", scale: "3x", pt: "29x29" },
    // iPad
    { name: "AppIcon~ipad", size: 76, idiom: "ipad", scale: "1x", pt: "76x76" },
    { name: "AppIcon@2x~ipad", size: 152, idiom: "ipad", scale: "2x", pt: "76x76" },
    { name: "AppIcon-83.5@2x~ipad", size: 167, idiom: "ipad", scale: "2x", pt: "83.5x83.5" },
    { name: "AppIcon-40~ipad", size: 40, idiom: "ipad", scale: "1x", pt: "40x40" },
    { name: "AppIcon-40@2x~ipad", size: 80, idiom: "ipad", scale: "2x", pt: "40x40" },
    { name: "AppIcon-20~ipad", size: 20, idiom: "ipad", scale: "1x", pt: "20x20" },
    { name: "AppIcon-20@2x~ipad", size: 40, idiom: "ipad", scale: "2x", pt: "20x20" },
    { name: "AppIcon-29~ipad", size: 29, idiom: "ipad", scale: "1x", pt: "29x29" },
    { name: "AppIcon-29@2x~ipad", size: 58, idiom: "ipad", scale: "2x", pt: "29x29" },
    // CarPlay
    { name: "AppIcon-60@2x~car", size: 120, idiom: "car", scale: "2x", pt: "60x60" },
    { name: "AppIcon-60@3x~car", size: 180, idiom: "car", scale: "3x", pt: "60x60" },
    // App Store
    { name: "AppIcon~ios-marketing", size: 1024, idiom: "ios-marketing", scale: "1x", pt: "1024x1024" },
  ],
  web: [
    { name: "favicon", size: 32, type: "ico" },
    { name: "apple-touch-icon", size: 180 },
    { name: "icon-192", size: 192 },
    { name: "icon-512", size: 512 },
    { name: "icon-192-maskable", size: 192, maskable: true },
    { name: "icon-512-maskable", size: 512, maskable: true },
  ],
};

// SizeList에서 보여줄 요약 (중복 제거)
export const ICON_SIZES_SUMMARY = {
  android: [
    { name: "mipmap-mdpi", size: 48 },
    { name: "mipmap-hdpi", size: 72 },
    { name: "mipmap-xhdpi", size: 96 },
    { name: "mipmap-xxhdpi", size: 144 },
    { name: "mipmap-xxxhdpi", size: 192 },
    { name: "play_store_512", size: 512 },
  ],
  ios: [
    { name: "AppIcon-20", size: "20~60" },
    { name: "AppIcon-29", size: "29~87" },
    { name: "AppIcon-40", size: "40~120" },
    { name: "AppIcon-60", size: "120~180" },
    { name: "AppIcon-76 (iPad)", size: "76~167" },
    { name: "AppIcon-CarPlay", size: "120~180" },
    { name: "App Store", size: 1024 },
  ],
  web: [
    { name: "favicon.ico", size: 32 },
    { name: "apple-touch-icon", size: 180 },
    { name: "icon-192 (+maskable)", size: 192 },
    { name: "icon-512 (+maskable)", size: 512 },
    { name: "icon-1024 (universal)", size: 1024 },
  ],
};

// 각 플랫폼별 실제 파일 개수 (SizeList 카운트용)
export const ICON_FILE_COUNTS = {
  android: 22, // 5 densities × 4 variants + play_store_512 + ic_launcher.xml
  ios: 23,     // 22 pngs + Contents.json
  web: 7,      // 6 icons + README.txt
};

export const SHAPES = [
  { id: "square", label: "사각", icon: "□" },
  { id: "rounded", label: "둥근사각", icon: "▢" },
  { id: "circle", label: "원형", icon: "○" },
];

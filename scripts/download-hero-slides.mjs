import fs from "fs";
import path from "path";
import sharp from "sharp";

const heroDir = path.join(process.cwd(), "public", "hero");
fs.mkdirSync(heroDir, { recursive: true });

/** Own business assets — hoarding, large-format print, LED sign board (dark/night) */
const slides = [
  ["billboard-advertising.jpg", "public/services/hoarding-advertising.jpg"],
  ["large-format-printing.jpg", "public/services/advertising-printing.jpg"],
  ["neon-signboard.jpg", "public/gallery/08-led-board.jpg"],
];

for (const [name, source] of slides) {
  const src = path.join(process.cwd(), source);
  const dest = path.join(heroDir, name);
  await sharp(src)
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.82, saturation: 1.05 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(dest);
  console.log("OK", name, "from", source);
}

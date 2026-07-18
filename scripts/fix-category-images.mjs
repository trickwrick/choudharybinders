import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sharp from "sharp";

const root = path.join(process.cwd(), "public", "categories");

const categories = [
  ["indoor-branding.jpg", "https://image3.jdomni.in/banner/21062021/F9/6F/E8/918AED6A06D9ECD3B6BB94B54F_1624266109845.jpg"],
  ["flex-printing.jpg", "https://image3.jdomni.in/banner/16062021/77/CD/12/00B5A906C472520756432DFFAB_1623847765787.jpg"],
  ["outdoor-branding.jpg", "https://image3.jdomni.in/banner/16062021/0A/12/4A/930E0267D361595D6EC1262640_1623848016077.png"],
  ["promotional-desk.jpg", "https://image2.jdomni.in/banner/16062021/CC/2D/48/7B0F606CC1E45826681A7B8050_1623848196541.png"],
  ["led-sign-boards.jpg", "https://image3.jdomni.in/banner/16062021/2C/DB/BA/D39107478672838381D60DE478_1623848266930.png"],
  ["offset-printing.jpg", "https://image3.jdomni.in/banner/24062021/99/4F/AE/23954952F827789033DBCCCAA5_1624533542006.jpg"],
];

fs.mkdirSync(root, { recursive: true });

async function processCategory(name, url) {
  const dest = path.join(root, name);
  const tmp = `${dest}.tmp`;

  execSync(`curl.exe -k -L "${url}" -o "${tmp}" --max-time 45`, { stdio: "pipe" });

  let pipeline = sharp(tmp).flatten({ background: "#ffffff" });

  try {
    pipeline = pipeline.trim({ threshold: 24 });
  } catch {
    // trim can fail on uniform images; continue without trim
  }

  await pipeline
    .resize(900, 675, { fit: "cover", position: "centre" })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(dest);

  fs.unlinkSync(tmp);
  console.log("OK", name);
}

for (const [name, url] of categories) {
  try {
    await processCategory(name, url);
  } catch (err) {
    console.error("ERR", name, err.message);
  }
}

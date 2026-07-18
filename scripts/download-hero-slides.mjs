import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sharp from "sharp";

const root = path.join(process.cwd(), "public", "hero");
fs.mkdirSync(root, { recursive: true });

const slides = [
  ["slide-1.jpg", "https://image1.jdomni.in/banner/16062021/55/75/8C/7377A5C0BC89149FD75AB1702F_1623846683359.png"],
  ["slide-2.jpg", "https://image3.jdomni.in/banner/16062021/0A/12/4A/930E0267D361595D6EC1262640_1623848016077.png"],
  ["slide-3.jpg", "https://image3.jdomni.in/banner/21062021/F9/6F/E8/918AED6A06D9ECD3B6BB94B54F_1624266109845.jpg"],
];

for (const [name, url] of slides) {
  const dest = path.join(root, name);
  const tmp = `${dest}.tmp`;
  try {
    execSync(`curl.exe -k -L "${url}" -o "${tmp}" --max-time 45`, { stdio: "pipe" });
    await sharp(tmp).resize(1920, 720, { fit: "cover" }).jpeg({ quality: 90 }).toFile(dest);
    fs.unlinkSync(tmp);
    console.log("OK", name);
  } catch (err) {
    console.error("ERR", name, err.message);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }
}

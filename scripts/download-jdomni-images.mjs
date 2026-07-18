import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sharp from "sharp";

const root = path.join(process.cwd(), "public");

const files = [
  ["categories/indoor-branding.jpg", "https://image3.jdomni.in/banner/21062021/F9/6F/E8/918AED6A06D9ECD3B6BB94B54F_1624266109845.jpg", 1200, 900],
  ["categories/flex-printing.jpg", "https://image3.jdomni.in/banner/16062021/77/CD/12/00B5A906C472520756432DFFAB_1623847765787.jpg", 1200, 900],
  ["categories/outdoor-branding.jpg", "https://image3.jdomni.in/banner/16062021/0A/12/4A/930E0267D361595D6EC1262640_1623848016077.png", 1200, 900],
  ["categories/promotional-desk.jpg", "https://image2.jdomni.in/banner/16062021/CC/2D/48/7B0F606CC1E45826681A7B8050_1623848196541.png", 1200, 900],
  ["categories/led-sign-boards.jpg", "https://image3.jdomni.in/banner/16062021/2C/DB/BA/D39107478672838381D60DE478_1623848266930.png", 1200, 900],
  ["categories/offset-printing.jpg", "https://image3.jdomni.in/banner/24062021/99/4F/AE/23954952F827789033DBCCCAA5_1624533542006.jpg", 1200, 900],
  ["center-banner.jpg", "https://image3.jdomni.in/banner/21062021/94/B2/8E/F9C30B01E5AC813BDDC5EDCAA3_1624267171422.png", 1600, 700],
  ["about.jpg", "https://image3.jdomni.in/banner/16062021/22/58/70/029AC67377CB926C85CAAA239A_1623849873258.png", 1400, 788],
  ["testimonials/brochure.jpg", "https://image2.jdomni.in/banner/16062021/5A/CE/22/75122D189D50ED288B3AE2B14C_1623850141088.png", 800, 900],
  ["services/alu-fabricators.jpg", "https://image3.jdomni.in/library/48/64/60/315D4601EC346076CF240D30C4_1496271461726_cropped_450X450.jpeg", 800, 800],
  ["services/advertising-pr.jpg", "https://image1.jdomni.in/library/7C/31/13/78FF29EF00A766BB2BC91B05C6_1496331969675_cropped_450X450.jpeg", 800, 800],
  ["services/advertising-printing.jpg", "https://image2.jdomni.in/library/24/40/DE/CA2CA43D3474D2D6BF68EFF05E_1496334975643_cropped_450X450.jpeg", 800, 800],
  ["services/fabrication-cladding.jpg", "https://image3.jdomni.in/library/AF/68/E3/9400759FDC9116810FFCBBDE10_1496243140715_cropped_450X450.jpeg", 800, 800],
  ["services/printing-publishing.jpg", "https://image1.jdomni.in/library/AB/CF/31/BA9310FF122E5B1B1818D25B1C_1496333212536_cropped_450X450.jpeg", 800, 800],
  ["services/hoarding-advertising.jpg", "https://image2.jdomni.in/banner/18052018/EF/12/28/62936F2FD49B0C88F37A56C2A4_1526619007060.jpg", 800, 800],
  ["services/outdoor-advertising.jpg", "https://image3.jdomni.in/banner/18052018/02/46/6D/A179DF786419D66611CB575A1F_1526619062547.jpg", 800, 800],
  ["services/newspaper-advertising.jpg", "https://image1.jdomni.in/banner/18052018/FA/4A/10/1FFD696520F2C90AF9D52BE022_1526619107906.jpg", 800, 800],
  ["services/magazine-advertisement.jpg", "https://image2.jdomni.in/banner/18052018/D2/9E/0C/4C18E431F03F4B69541796A8B1_1526619155627.jpg", 800, 800],
  ["services/media-planning.jpg", "https://image3.jdomni.in/banner/18052018/3F/62/99/7403D0AC30226DD52689AB777E_1526619384844.jpg", 800, 800],
  ["gallery/01-printing-solution.jpg", "https://image3.jdomni.in/banner/25042024/11/93/AC/77D00134A9796DE3C9F2136B0E_1714039334063.jpg", 900, 675],
  ["gallery/02-shop-branding.jpg", "https://image3.jdomni.in/library/01052021/35/56/1E/47DF6F685A2717FE8C925E137E_1619852211421.jpg", 900, 675],
  ["gallery/03-storefront-signage.jpg", "https://image2.jdomni.in/library/01052021/EB/48/92/F034A9530D94245A1E27AAD11D_1619852227706.jpg", 900, 675],
  ["gallery/04-jewellery-store.jpg", "https://image3.jdomni.in/library/01052021/2C/DF/40/BE47BBBEBEDFC829527E0D4D65_1619852198359.jpg", 900, 675],
  ["gallery/05-hotel-signboard.jpg", "https://image3.jdomni.in/library/01052021/9F/FA/CB/073288B7370692330B7A20A1F1_1619852246145.jpg", 900, 675],
  ["gallery/06-outdoor-banner.jpg", "https://image2.jdomni.in/library/01052021/4E/A1/50/25FFA99360FECAE5B1695D2C6A_1619852242393.jpg", 900, 675],
  ["gallery/07-flex-printing.jpg", "https://image2.jdomni.in/library/01052021/E8/29/8F/281ACEA84B256ABFF8D22F6821_1619852208120.jpg", 900, 675],
  ["gallery/08-led-board.jpg", "https://image3.jdomni.in/library/01052021/4D/62/63/CF353B733F216714D010A61829_1619852224058.jpg", 900, 675],
  ["gallery/09-corporate-branding.jpg", "https://image2.jdomni.in/library/01052021/EE/FA/6C/E54F0DE2E3FF7C8961CD9CD46F_1619852235402.jpg", 900, 675],
  ["videos/printing-overview.jpg", "https://jdstore03.akamaized.net/images/e4/20/e42077e6-4605-401d-95c9-73a5fede7a39/omni-60c5e67a9f2c1c8aaf084e85ca998d82-022PXX22_XX22_170427143737_A7Q3-46617-1558689302443_600x480_00h.00m.05s.jpg", 900, 506],
  ["videos/flex-banner.jpg", "https://jdstore03.akamaized.net/images/9c/38/9c3854bf-a13a-42b7-8728-2737b19e1774/omni-5dbc13a40adfcb3fa003564dac8d40e6-022PXX22_XX22_170427143737_A7Q3-45275-1556001002271_600x338_00h.00m.05s.jpg", 900, 506],
  ["videos/led-installation.jpg", "https://image3.jdomni.in/banner/08072019/A5/DB/70/4796813498AE7B6ADDC4FC9B6A_1562574496422.jpg", 900, 506],
  ["products/01-banner-stand.jpg", "https://image3.jdomni.in/banner/16062021/0A/12/4A/930E0267D361595D6EC1262640_1623848016077.png", 800, 800],
  ["products/02-flex-board.jpg", "https://image3.jdomni.in/banner/16062021/77/CD/12/00B5A906C472520756432DFFAB_1623847765787.jpg", 800, 800],
  ["products/03-led-board.jpg", "https://image3.jdomni.in/banner/16062021/2C/DB/BA/D39107478672838381D60DE478_1623848266930.png", 800, 800],
  ["products/04-promotional-canopy.jpg", "https://image2.jdomni.in/banner/16062021/CC/2D/48/7B0F606CC1E45826681A7B8050_1623848196541.png", 800, 800],
  ["products/05-pamphlet-print.jpg", "https://image3.jdomni.in/banner/24062021/99/4F/AE/23954952F827789033DBCCCAA5_1624533542006.jpg", 800, 800],
  ["products/06-indoor-branding.jpg", "https://image3.jdomni.in/banner/21062021/F9/6F/E8/918AED6A06D9ECD3B6BB94B54F_1624266109845.jpg", 800, 800],
];

for (const [relativePath, url, w, h] of files) {
  const dest = path.join(root, relativePath);
  const tmp = `${dest}.tmp`;
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  try {
    execSync(`curl.exe -k -L "${url}" -o "${tmp}" --max-time 45`, { stdio: "pipe" });
    const stat = fs.statSync(tmp);
    if (stat.size < 500) throw new Error(`too small (${stat.size}b)`);
    await sharp(tmp).resize(w, h, { fit: "cover" }).jpeg({ quality: 88 }).toFile(dest);
    fs.unlinkSync(tmp);
    console.log("OK", relativePath, stat.size);
  } catch (err) {
    console.error("ERR", relativePath, err.message);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }
}

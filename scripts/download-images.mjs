import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public");

const downloads = [
  // Categories (missing + refresh)
  ["categories/outdoor-branding.jpg", "https://images.unsplash.com/photo-1533750516457-a7ff99226dce?auto=format&fit=crop&w=1200&h=900&q=85"],
  ["categories/led-sign-boards.jpg", "https://images.unsplash.com/photo-1567443024551-f3e2a5f4a4ef?auto=format&fit=crop&w=1200&h=900&q=85"],
  ["categories/offset-printing.jpg", "https://images.unsplash.com/photo-1586281380349-0a035e178128?auto=format&fit=crop&w=1200&h=900&q=85"],
  // Sections
  ["center-banner.jpg", "https://images.unsplash.com/photo-1586075010923-2dd45795fbfc?auto=format&fit=crop&w=1600&h=700&q=85"],
  ["about.jpg", "https://images.unsplash.com/photo-1561214115-f2f8676942b1?auto=format&fit=crop&w=1400&h=788&q=85"],
  ["testimonials/brochure.jpg", "https://images.unsplash.com/photo-1586281380349-63253131947c?auto=format&fit=crop&w=800&h=900&q=85"],
  // Services
  ["services/alu-fabricators.jpg", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&h=800&q=85"],
  ["services/advertising-pr.jpg", "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&h=800&q=85"],
  ["services/advertising-printing.jpg", "https://images.unsplash.com/photo-1611532736422-ac874f489605?auto=format&fit=crop&w=800&h=800&q=85"],
  ["services/fabrication-cladding.jpg", "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&h=800&q=85"],
  ["services/printing-publishing.jpg", "https://images.unsplash.com/photo-1507842217343-583bb7270f66?auto=format&fit=crop&w=800&h=800&q=85"],
  ["services/hoarding-advertising.jpg", "https://images.unsplash.com/photo-1571863530445-56c511964b45?auto=format&fit=crop&w=800&h=800&q=85"],
  ["services/outdoor-advertising.jpg", "https://images.unsplash.com/photo-1533750516457-a7ff99226dce?auto=format&fit=crop&w=800&h=800&q=85"],
  ["services/newspaper-advertising.jpg", "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&h=800&q=85"],
  ["services/magazine-advertisement.jpg", "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&h=800&q=85"],
  ["services/media-planning.jpg", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=800&q=85"],
  // Gallery
  ["gallery/01-printing-solution.jpg", "https://images.unsplash.com/photo-1586281380349-0a035e178128?auto=format&fit=crop&w=900&h=675&q=85"],
  ["gallery/02-shop-branding.jpg", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&h=675&q=85"],
  ["gallery/03-storefront-signage.jpg", "https://images.unsplash.com/photo-1567443024551-f3e2a5f4a4ef?auto=format&fit=crop&w=900&h=675&q=85"],
  ["gallery/04-jewellery-store.jpg", "https://images.unsplash.com/photo-1617038260897-41a89fa42ca7?auto=format&fit=crop&w=900&h=675&q=85"],
  ["gallery/05-hotel-signboard.jpg", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&h=675&q=85"],
  ["gallery/06-outdoor-banner.jpg", "https://images.unsplash.com/photo-1571863530445-56c511964b45?auto=format&fit=crop&w=900&h=675&q=85"],
  ["gallery/07-flex-printing.jpg", "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&h=675&q=85"],
  ["gallery/08-led-board.jpg", "https://images.unsplash.com/photo-1516450360432-42c0b7099b3?auto=format&fit=crop&w=900&h=675&q=85"],
  ["gallery/09-corporate-branding.jpg", "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&h=675&q=85"],
  // Video thumbnails
  ["videos/printing-overview.jpg", "https://images.unsplash.com/photo-1611532736422-ac874f489605?auto=format&fit=crop&w=900&h=506&q=85"],
  ["videos/flex-banner.jpg", "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&h=506&q=85"],
  ["videos/led-installation.jpg", "https://images.unsplash.com/photo-1524678601655-a9a69f4742eb?auto=format&fit=crop&w=900&h=506&q=85"],
];

async function downloadOne(relativePath, url) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await sharp(buffer).jpeg({ quality: 85, mozjpeg: true }).toFile(filePath);
  console.log("OK", relativePath);
}

for (const [relativePath, url] of downloads) {
  try {
    await downloadOne(relativePath, url);
  } catch (err) {
    console.error("ERR", relativePath, err.message);
  }
}

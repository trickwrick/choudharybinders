import fs from "node:fs";
import path from "node:path";
import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv(path.join(process.cwd(), ".env.local"));
loadEnv(path.join(process.cwd(), ".env"));

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "choudharybinders";

if (!uri) {
  console.error("MONGODB_URI is missing.");
  process.exit(1);
}

const catalogPairs = [
  ["offset", "business-card"],
  ["offset", "letterhead"],
  ["offset", "envelope"],
  ["offset", "pamphlet-flyer"],
  ["offset", "brochure-catalogue"],
  ["offset", "opd-doctor-file"],
  ["offset", "book-magazine"],
  ["offset", "dairy-calendars"],
  ["offset", "poster"],
  ["offset", "bill-book-office-stationery"],
  ["flex", "banners-hoardings"],
  ["flex", "event-displays"],
  ["flex", "glowsign-boards"],
  ["flex", "roll-up-standees"],
  ["flex", "one-way-vision"],
  ["flex", "frosted-vinyl"],
  ["flex", "indoor-outdoor-branding"],
  ["flex", "canvas-frames"],
  ["flex", "wall-graphics"],
  ["digital", "certificates"],
  ["digital", "visiting-cards"],
  ["digital", "flyers-posters"],
  ["digital", "personalized-prints"],
  ["digital", "customized-catalogue"],
  ["digital", "customized-brochure"],
  ["digital", "custom-invitations"],
  ["digital", "stickers-labels"],
  ["digital", "menu-cards"],
  ["signage", "acrylic-led-signage"],
  ["signage", "neon-sign-board"],
  ["signage", "acrylic-photo-frames"],
  ["signage", "acrylic-letters"],
  ["signage", "stainless-steel-letters"],
  ["signage", "name-plates"],
  ["signage", "laser-cnc"],
  ["signage", "cut-vinyl-glowing-board"],
  ["signage", "bothside-led-lollipop"],
  ["signage", "road-direction-sign-board"],
  ["binding", "perfect-binding"],
  ["binding", "spiral-binding"],
  ["binding", "wire-o-binding"],
  ["binding", "hard-binding"],
  ["binding", "document-finishing"],
  ["customized-gifts", "corporate-gifts"],
  ["customized-gifts", "promotional-merchandise"],
  ["customized-gifts", "employee-welcome-kits"],
  ["customized-gifts", "photo-gifts"],
  ["customized-gifts", "personalized-accessories"],
  ["customized-gifts", "event-wedding-gifts"],
  ["customized-gifts", "school-college-merchandise"],
  ["customized-gifts", "festival-gift-hampers"],
  ["customized-gifts", "corporate-gift-hampers"],
  ["customized-gifts", "branded-corporate-gifts"],
  ["customized-gifts", "executive-gift-set"],
  ["customized-gifts", "client-appreciation-gifts"],
  ["customized-gifts", "team-celebration-gifts"],
  ["mobile-van", "vehicle-branding"],
  ["mobile-van", "pole-kiosk-sign-board"],
  ["mobile-van", "promotional-van-rental-service"],
  ["mobile-van", "promotional-road-show-van-rental-service"],
  ["mobile-van", "promotional-van-with-running-video-screen"],
  ["unipole", "highway-unipole-advertising"],
  ["unipole", "commercial-area-branding"],
  ["unipole", "custom-size-unipole-designs"],
  ["unipole", "led-glow-sign-integration"],
  ["unipole", "creative-design-solutions"],
  ["unipole", "backlit-frontlit-flex-printing"],
  ["unipole", "installation-mounting-support"],
  ["unipole", "eco-solvent-high-resolution-printing"],
  ["unipole", "political-event-campaign-branding"],
  ["unipole", "real-estate-corporate-promotions"],
  ["outdoor-advertisement", "billboard-advertising"],
  ["outdoor-advertisement", "hoarding-print"],
  ["outdoor-advertisement", "unipole-board"],
  ["outdoor-advertisement", "shop-signage-board"],
  ["outdoor-advertisement", "pole-kiosk-board"],
  ["outdoor-advertisement", "highway-branding"],
  ["led-sign-board", "acrylic-led-board"],
  ["led-sign-board", "neon-sign-board"],
  ["led-sign-board", "glow-sign-board"],
  ["led-sign-board", "led-name-board"],
  ["led-sign-board", "led-lollipop-sign"],
  ["led-sign-board", "backlit-sign-board"],
  ["led-sign-board", "shop-front-led-board"],
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("products");

  const result = await collection.deleteMany({
    $or: catalogPairs.map(([categoryId, id]) => ({ categoryId, id })),
  });

  const remaining = await collection.countDocuments();
  console.log(`Removed ${result.deletedCount ?? 0} auto-imported catalog products.`);
  console.log(`Remaining products in admin: ${remaining}`);
} finally {
  await client.close();
}

import fs from "fs";
import path from "path";
import sharp from "sharp";

const src =
  "C:/Users/new user/.cursor/projects/c-Users-new-user-Desktop-choudharybinders/assets/c__Users_new_user_AppData_Roaming_Cursor_User_workspaceStorage_928a11f9e3bc1427b6b1786a66be6eca_images_image-39088f15-dfbb-49e8-a28e-d96959a6499b.png";

const outDir = path.join(process.cwd(), "public", "categories");

// Crop boxes tuned to the reference category grid screenshot (519x319)
const crops = [
  { file: "indoor-branding.jpg", left: 4, top: 42, width: 165, height: 88 },
  { file: "flex-printing.jpg", left: 177, top: 42, width: 165, height: 88 },
  { file: "outdoor-branding.jpg", left: 350, top: 42, width: 165, height: 88 },
  { file: "promotional-desk.jpg", left: 4, top: 162, width: 165, height: 88 },
  { file: "led-sign-boards.jpg", left: 177, top: 162, width: 165, height: 88 },
  { file: "offset-printing.jpg", left: 350, top: 162, width: 165, height: 88 },
];

fs.mkdirSync(outDir, { recursive: true });

for (const crop of crops) {
  const dest = path.join(outDir, crop.file);
  await sharp(src)
    .extract({
      left: crop.left,
      top: crop.top,
      width: crop.width,
      height: crop.height,
    })
    .resize(900, 675, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(dest);
  console.log("OK", crop.file);
}

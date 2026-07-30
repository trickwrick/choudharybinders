import fs from "fs";
import path from "path";
import sharp from "sharp";

const src =
  "C:/Users/new user/.cursor/projects/c-Users-new-user-Desktop-choudharybinders/assets/c__Users_new_user_AppData_Roaming_Cursor_User_workspaceStorage_928a11f9e3bc1427b6b1786a66be6eca_images_image-6c20a1c1-711c-4a36-beb7-b1cf04336732.png";

const outDir = path.join(process.cwd(), "public", "clients");
const scale = 10;
const rowHeight = 28;

const labels = {
  bosch: "Bosch",
  bisleri: "Bisleri",
  sdmh: "SDMH",
  nandan: "Nandan",
  umed: "Utkarsh",
  "max-healthcare": "Max Healthcare",
  "lp-savani": "Louis Philippe",
  seion: "Seion",
  felicity: "Felicity",
  "rolly-polly": "Rolly Polly",
  mysterio: "Mysterio",
  allen: "Allen",
  arvind: "Arvind",
  manglam: "Manglam",
  "felicity-estates": "Felicity Estates",
  "ara-tiles": "Ara Tiles",
  sanfran: "Sanfran",
  jecrc: "JECRC University",
  amanveer: "Amanveer",
  greenwell: "Greenwell",
  "rungta-hospital": "Rungta Hospital",
  "apex-hospital": "Apex Hospital",
  kinsa: "Kinsa",
  nanugour: "Nanugour",
  "vikram-stores": "Vikram Stores",
  switchon: "SwitchON",
  youfit: "Youfit",
  "raj-hospital": "Raj Hospital",
  "dna-power": "DNA Power",
  normet: "Normet",
  "appu-ghar": "Appu Ghar",
  palki: "Palki",
  "emkay-diagnostics": "Emkay Diagnostics",
};

const rows = [
  {
    top: 122,
    names: ["bosch", "bisleri", "sdmh", "nandan", "umed", "max-healthcare"],
    manualRanges: [
      [26, 80],
      [88, 128],
      [134, 167],
      [173, 215],
      [221, 245],
      [251, 286],
    ],
  },
  {
    top: 164,
    minGap: 28,
    names: ["lp-savani", "seion", "felicity", "rolly-polly", "mysterio"],
    rangeFilter: (ranges) => ranges.slice(1, 6),
  },
  {
    top: 206,
    minGap: 28,
    names: [
      "allen",
      "arvind",
      "manglam",
      "felicity-estates",
      "ara-tiles",
      "sanfran",
    ],
  },
  {
    top: 248,
    minGap: 28,
    names: [
      "jecrc",
      "amanveer",
      "greenwell",
      "rungta-hospital",
      "apex-hospital",
      "kinsa",
    ],
  },
  {
    top: 290,
    minGap: 28,
    names: ["nanugour", "vikram-stores", "switchon"],
    rangeFilter: (ranges) => [ranges[1], ranges[4], ranges[5]].filter(Boolean),
  },
  {
    top: 332,
    minGap: 28,
    names: ["youfit", "raj-hospital", "dna-power"],
    rangeFilter: (ranges) => [ranges[1], ranges[2], ranges[3]].filter(Boolean),
  },
  {
    top: 348,
    names: ["normet", "appu-ghar", "palki"],
    manualRanges: [
      [21, 64],
      [66, 138],
      [140, 191],
    ],
  },
];

function tightenRange([left, right], index, total) {
  const margin = 2;

  return [
    index === 0 ? left : left + margin,
    index === total - 1 ? right : right - margin,
  ];
}

async function findLogoRanges(upscaled, top, minGap) {
  const { data, info } = await sharp(upscaled)
    .extract({
      left: 0,
      top: top * scale,
      width: 313 * scale,
      height: rowHeight * scale,
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const density = new Array(width).fill(0);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < info.height; y++) {
      const index = (y * width + x) * info.channels;
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const max = Math.max(red, green, blue);
      const min = Math.min(red, green, blue);
      const saturation = max ? (max - min) / max : 0;

      if (max < 248 && saturation > 0.07) {
        density[x]++;
      }
    }
  }

  const gapColumns = [];
  for (let x = 0; x < width; x++) {
    if (density[x] <= 1) {
      gapColumns.push(x);
    }
  }

  const gapGroups = [];
  let groupStart = gapColumns[0];
  let groupEnd = gapColumns[0];

  for (const column of gapColumns) {
    if (column - groupEnd <= 2) {
      groupEnd = column;
    } else {
      if (groupEnd - groupStart >= 2) {
        gapGroups.push([
          Math.round(groupStart / scale),
          Math.round(groupEnd / scale),
        ]);
      }
      groupStart = column;
      groupEnd = column;
    }
  }

  if (groupEnd - groupStart >= 2) {
    gapGroups.push([
      Math.round(groupStart / scale),
      Math.round(groupEnd / scale),
    ]);
  }

  const cuts = gapGroups
    .map(([start, end]) => Math.round((start + end) / 2))
    .filter((cut) => cut > 22 && cut < 292);

  const mergedCuts = [];
  for (const cut of cuts) {
    if (
      !mergedCuts.length ||
      cut - mergedCuts[mergedCuts.length - 1] >= minGap
    ) {
      mergedCuts.push(cut);
    }
  }

  const ranges = [];
  let rangeStart = 21;

  for (const cut of mergedCuts) {
    if (cut - rangeStart >= 15) {
      ranges.push([rangeStart, cut - 1]);
    }
    rangeStart = cut + 1;
  }

  if (294 - rangeStart >= 12) {
    ranges.push([rangeStart, 294]);
  }

  return ranges;
}

async function cropLogo(upscaled, top, left, right) {
  const width = right - left + 1;

  return sharp(upscaled)
    .extract({
      left: left * scale,
      top: top * scale,
      width: width * scale,
      height: rowHeight * scale,
    })
    .trim({ threshold: 10 })
    .resize(280, 96, {
      fit: "inside",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .extend({
      top: 8,
      bottom: 8,
      left: 12,
      right: 12,
      background: "#ffffff",
    })
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();
}

fs.mkdirSync(outDir, { recursive: true });

const upscaled = await sharp(src)
  .resize(313 * scale, 426 * scale, { kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();

const clientLogos = [];

for (const row of rows) {
  let ranges = row.manualRanges
    ? row.manualRanges
    : await findLogoRanges(upscaled, row.top, row.minGap);

  if (row.rangeFilter) {
    ranges = row.rangeFilter(ranges);
  }

  const count = Math.min(row.names.length, ranges.length);

  for (let index = 0; index < count; index++) {
    const [left, right] = row.manualRanges
      ? ranges[index]
      : tightenRange(ranges[index], index, count);
    const name = row.names[index];
    const output = await cropLogo(upscaled, row.top, left, right);

    await sharp(output).toFile(path.join(outDir, `${name}.png`));

    clientLogos.push({
      name,
      label: labels[name],
      src: `/clients/${name}.png`,
    });

    console.log("OK", name, `${left}-${right}`);
  }
}

fs.writeFileSync(
  path.join(process.cwd(), "src", "lib", "client-logos.ts"),
  `export const clientLogos = ${JSON.stringify(clientLogos, null, 2)} as const;\n`,
);

console.log(`Done: ${clientLogos.length} logos`);

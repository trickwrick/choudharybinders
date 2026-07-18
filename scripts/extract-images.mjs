import fs from "fs";

const html = fs.readFileSync("tmp-site.html", "utf8");
const match = html.match(/window\.PRELOADED_STATE = (\{[\s\S]*?\});/);
if (!match) {
  console.error("PRELOADED_STATE not found");
  process.exit(1);
}

const state = JSON.parse(match[1]);
const json = JSON.stringify(state);
const urls = [
  ...new Set(
    [...json.matchAll(/https:\\\/\\\/image[0-9]\.jdomni\.in[^"\\]+/g)].map((m) =>
      m[0].replace(/\\\//g, "/")
    )
  ),
];

urls.forEach((u) => console.log(u));

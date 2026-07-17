import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const required = [
  "01.ui.css",
  "02.transForm.css",
  "03.bootstrap.css",
  "VERSION",
  "manifest.json",
  "css.php",
  "js.php",
  "init.js",
  "img/bi/clipboard.svg",
  "img/bi/folder2.svg",
  "img/bi/trash.svg",
  "img/bi/x-lg.svg",
  "img/files/big/_.png",
  "img/files/small/_.png"
];

for (const file of required) {
  await access(resolve("dist/bootstrap5", file));
}

const css = await readFile("dist/bootstrap5/03.bootstrap.css", "utf8");
for (const selector of ["#toolbar", "#folders", ".ui-dialog", "@media (max-width: 767.98px)"]) {
  if (!css.includes(selector)) throw new Error(`Missing expected CSS: ${selector}`);
}

const packageMetadata = JSON.parse(await readFile("package.json", "utf8"));
const version = (await readFile("dist/bootstrap5/VERSION", "utf8")).trim();
const manifest = JSON.parse(await readFile("dist/bootstrap5/manifest.json", "utf8"));
if (version !== packageMetadata.version || manifest.version !== packageMetadata.version) {
  throw new Error("Theme version files do not match package.json.");
}

console.log(`Distribution check passed (${required.length} required files).`);

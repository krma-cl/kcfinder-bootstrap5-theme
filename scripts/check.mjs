import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const required = [
  "01.ui.css",
  "02.transForm.css",
  "03.bootstrap.css",
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

console.log(`Distribution check passed (${required.length} required files).`);

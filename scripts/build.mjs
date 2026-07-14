import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist/bootstrap5");
const sass = resolve(root, "node_modules/sass/sass.js");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await cp(resolve(root, "vendor/kcfinder/01.ui.css"), resolve(dist, "01.ui.css"));
await cp(resolve(root, "vendor/kcfinder/02.transForm.css"), resolve(dist, "02.transForm.css"));
await cp(resolve(root, "vendor/kcfinder/img"), resolve(dist, "img"), { recursive: true });
await mkdir(resolve(dist, "img/bi"), { recursive: true });
for (const icon of [
  "arrows-fullscreen", "arrow-clockwise", "cloud-arrow-up", "folder2-open",
  "gear", "info-circle", "layout-sidebar-inset"
]) {
  await cp(
    resolve(root, `node_modules/bootstrap-icons/icons/${icon}.svg`),
    resolve(dist, `img/bi/${icon}.svg`)
  );
}
await cp(resolve(root, "src/js/init.js"), resolve(dist, "init.js"));
await cp(resolve(root, "src/php/css.php"), resolve(dist, "css.php"));
await cp(resolve(root, "src/php/js.php"), resolve(dist, "js.php"));

execFileSync(process.execPath, [
  sass,
  "--no-source-map",
  "--style=expanded",
  resolve(root, "src/scss/theme.scss"),
  resolve(dist, "03.bootstrap.css")
], { stdio: "inherit" });

const banner = `/* KCFinder Bootstrap 5 theme v0.1.0 | Bootstrap 5.3.8 | generated, do not edit */\n`;
const cssPath = resolve(dist, "03.bootstrap.css");
await writeFile(cssPath, banner + await readFile(cssPath, "utf8"), "utf8");

console.log(`Theme built at ${dist}`);

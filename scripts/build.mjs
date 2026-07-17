import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist/bootstrap5");
const sass = resolve(root, "node_modules/sass/sass.js");
const packageMetadata = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const version = packageMetadata.version;

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await cp(resolve(root, "vendor/kcfinder/01.ui.css"), resolve(dist, "01.ui.css"));
await cp(resolve(root, "vendor/kcfinder/02.transForm.css"), resolve(dist, "02.transForm.css"));
await cp(resolve(root, "vendor/kcfinder/img"), resolve(dist, "img"), { recursive: true });
await mkdir(resolve(dist, "img/bi"), { recursive: true });
for (const icon of [
  "arrow-clockwise", "arrows-fullscreen", "arrows-move", "check2-square",
  "clipboard", "clipboard-plus", "clipboard-x", "cloud-arrow-up", "copy",
  "crop", "dash-square", "download", "eye", "folder-plus", "folder-x",
  "folder2", "folder2-open", "gear", "info-circle", "layout-sidebar-inset",
  "pencil-square", "plus-square", "search", "trash", "x-lg"
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

const banner = `/* KCFinder Bootstrap 5 theme v${version} | Bootstrap 5.3.8 | generated, do not edit */\n`;
const cssPath = resolve(dist, "03.bootstrap.css");
await writeFile(cssPath, banner + await readFile(cssPath, "utf8"), "utf8");
await writeFile(resolve(dist, "VERSION"), `${version}\n`, "utf8");

async function filesBelow(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...await filesBelow(resolve(directory, entry.name), relative));
    } else if (entry.name !== "manifest.json") {
      files.push(relative);
    }
  }
  return files;
}

const hashes = {};
for (const file of (await filesBelow(dist)).sort()) {
  hashes[file] = createHash("sha256")
    .update(await readFile(resolve(dist, file)))
    .digest("hex");
}
await writeFile(resolve(dist, "manifest.json"), JSON.stringify({
  name: "krma-cl/kcfinder-bootstrap5-theme",
  version,
  bootstrap: packageMetadata.devDependencies.bootstrap,
  bootstrapIcons: packageMetadata.devDependencies["bootstrap-icons"],
  files: hashes
}, null, 2) + "\n", "utf8");

console.log(`Theme ${version} built at ${dist}`);

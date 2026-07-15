# Bootstrap 5 Theme for KCFinder Resurrected

[Leer en español](README.es.md)

An independent, installable Bootstrap 5 theme for [KCFinder Resurrected](https://github.com/krma-cl/kcfinder-Resurrected). KCFinder Resurrected continues the archived [sunhater/kcfinder](https://github.com/sunhater/kcfinder) project originally created by Pavel Tzonkov.

This repository is a community project. It is not an official Bootstrap project and it does not replace or modify the KCFinder core.

## Highlights

- Bootstrap 5 visual language without loading Bootstrap from a CDN.
- Local Bootstrap Icons for toolbars, folders, menus, dialogs and form controls.
- Responsive folder panel for narrow screens.
- Refined thumbnail and list views.
- Consistent radio buttons, checkboxes and language selector while preserving KCFinder's existing transForm behavior.
- Self-contained production package: PHP, Node.js and Composer dependencies are not added to KCFinder.

## Compatibility

- KCFinder Resurrected 4.x.
- Bootstrap 5.3.8 design tokens and Bootstrap Icons 1.13.1.
- Current versions of Chrome, Edge and Firefox. Safari should work but is not yet part of the regular test pass.

The theme does not change KCFinder's PHP requirements, authentication, uploads, permissions or security configuration.

On current KCFinder Resurrected versions, the theme reuses the folder drawer and focus management provided by the core. A compatible fallback remains available for earlier 4.x installations, so a visual theme update does not force a server-side upgrade first.

## Install

### 1. Obtain the theme

Download a release, or clone this repository and use the already-built `dist/bootstrap5` directory.

### 2. Copy the production directory

Copy the complete directory:

```text
dist/bootstrap5
```

into the `themes` directory of your KCFinder installation. The resulting layout must be:

```text
kcfinder/
└── themes/
    └── bootstrap5/
        ├── 01.ui.css
        ├── 02.transForm.css
        ├── 03.bootstrap.css
        ├── css.php
        ├── init.js
        ├── js.php
        └── img/
```

Do not copy `src`, `scripts`, `node_modules` or `vendor` to the production server.

### 3. Select the theme

Set the default in `conf/config.php`:

```php
'theme' => 'bootstrap5',
```

An integration may select it through the session instead:

```php
$_SESSION['KCFINDER']['theme'] = 'bootstrap5';
```

The KCFinder jQuery adapter also accepts the theme option:

```javascript
$('#file-browser').kcfinder({
    url: '/kcfinder/browse.php',
    theme: 'bootstrap5'
});
```

For a temporary test, open:

```text
/kcfinder/browse.php?theme=bootstrap5
```

The URL option should be treated as a preview mechanism. Prefer configuration or session selection in production.

### 4. Clear generated theme caches

After installing or updating, remove these generated files if they exist:

```text
cache/theme_bootstrap5.css
cache/theme_bootstrap5.js
```

KCFinder recreates them automatically. A hard browser refresh may also be required after an update.

## Update

1. Back up `themes/bootstrap5` if it contains local changes.
2. Replace it with the new `dist/bootstrap5` directory.
3. Remove the two generated cache files listed above.
4. Reload KCFinder and test thumbnail view, list view, upload and dialogs.

Avoid editing files inside `dist/bootstrap5` directly. Make source changes in `src` and rebuild so updates remain reproducible.

## Uninstall

Change the configured theme back to `default`, remove `themes/bootstrap5`, and delete any generated `theme_bootstrap5` cache files.

## Development

Development requires Node.js 20 or newer and npm:

```bash
npm ci
npm run build
npm run check
```

Source files live in `src`. The build combines them with compatibility assets under `vendor/kcfinder` and writes the installable package to `dist/bootstrap5`.

Before committing, run:

```bash
npm run check
git diff --exit-code -- dist/bootstrap5
```

The second command confirms that the committed distribution matches the source. See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow.

## Versioning

The theme follows Semantic Versioning independently from KCFinder. Bootstrap and Bootstrap Icons versions are pinned in `package.json` and recorded in the changelog.

## Project lineage and credits

- [KCFinder Resurrected](https://github.com/krma-cl/kcfinder-Resurrected), maintained by krma-cl.
- [KCFinder](https://github.com/sunhater/kcfinder), originally created by Pavel Tzonkov and now archived.
- [Bootstrap](https://github.com/twbs/bootstrap) and [Bootstrap Icons](https://github.com/twbs/icons), maintained by the Bootstrap team.

## Maintenance and community

This official KCFinder theme is maintained by [KRMA](https://krmachile.com) together with its community of users and contributors. KRMA provides development, coordination and infrastructure to support the project's continuity.

## License

The theme is available under `GPL-3.0-or-later OR LGPL-3.0-or-later`, matching KCFinder's license choice. Bootstrap and Bootstrap Icons are distributed under the MIT License. See [LICENSE](LICENSE), the full texts under [`licenses`](licenses), and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

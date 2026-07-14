# Contributing

Contributions that improve compatibility, accessibility or visual consistency are welcome.

## Development setup

1. Install Node.js 20 or newer.
2. Fork and clone the repository.
3. Install dependencies with `npm ci`.
4. Make source changes under `src`.
5. Run `npm run check`.

The `dist/bootstrap5` directory is committed intentionally because it is the production-ready package. Include the rebuilt distribution in every source change that affects it.

## Compatibility principles

- Keep Docker, Node.js and build tooling optional for KCFinder users.
- Do not require Bootstrap, Bootstrap Icons or a CDN at runtime.
- Avoid changes to KCFinder core behavior and APIs.
- Preserve jQuery UI and transForm behavior unless a narrowly scoped compatibility fix requires otherwise.
- Test both thumbnail and list views, settings controls, folders, dialogs and context menus.
- Do not hide warnings or browser errors merely to make a check pass.

## Pull requests

Keep changes focused and explain:

- what users see before and after;
- which KCFinder and browser versions were tested;
- whether generated files under `dist/bootstrap5` changed; and
- any remaining compatibility risk.

By contributing, you agree that your contribution is licensed under the repository's `GPL-3.0-or-later OR LGPL-3.0-or-later` license choice.

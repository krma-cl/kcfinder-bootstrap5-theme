# Orientación para trabajar en el tema Bootstrap 5

Este repositorio contiene el tema visual, instalable e independiente para KCFinder Resurrected. Lee `README.md`, `CONTRIBUTING.md` y la [guía canónica del ecosistema](https://krma-cl.github.io/kcfinder-docs/roadmap/maintainer-guide).

## Línea base

- Release estable al crear esta guía: `v0.1.0`
- Bootstrap 5.3.8 y Bootstrap Icons 1.13.1, fijados en `package.json`
- Node.js 20+
- Rama principal: `main`

## Responsabilidad y límites

- Aquí pertenecen estilos, iconos, controles visuales, panel móvil y accesibilidad que pueda resolverse desde el tema.
- No cambies autenticación, permisos, uploads, sesiones ni reglas de seguridad.
- No agregues una dependencia de CDN: Bootstrap e iconos se distribuyen localmente.
- Modifica las fuentes en `src`; `dist/bootstrap5` es un artefacto reproducible que también debe quedar actualizado.
- Conserva la compatibilidad con el sistema `transForm` y prueba vista de miniaturas, lista, diálogos, idiomas, teclado y tamaños estrechos.

## Validación

```bash
npm ci
npm run check
git diff --exit-code -- dist/bootstrap5
```

La última orden debe quedar sin diferencias después de incluir conscientemente el artefacto reconstruido en el commit.

## Flujo y documentación

- Usa ramas `krma/<descripcion>`.
- Mantén `README.md`, `README.es.md` y `CHANGELOG.md` coherentes.
- Si cambia la instalación o compatibilidad, actualiza también `kcfinder-docs`.
- El tema usa SemVer independiente del núcleo y se distribuye mediante GitHub Releases.

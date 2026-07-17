# Tema Bootstrap 5 para KCFinder Resurrected

[Read in English](README.md)

Tema Bootstrap 5 independiente e instalable para [KCFinder Resurrected](https://github.com/krma-cl/kcfinder-Resurrected). KCFinder Resurrected continúa el proyecto archivado [sunhater/kcfinder](https://github.com/sunhater/kcfinder), creado originalmente por Pavel Tzonkov.

Este repositorio es un proyecto comunitario. No es un proyecto oficial de Bootstrap y no reemplaza ni modifica el núcleo de KCFinder.

## Características

- Apariencia Bootstrap 5 sin cargar Bootstrap desde un CDN.
- Bootstrap Icons locales para barras, carpetas, menús, diálogos y formularios.
- Panel de carpetas adaptable para pantallas estrechas.
- Presentación de la búsqueda optativa por nombres de carpetas y archivos incluida en versiones compatibles de KCFinder.
- Vistas de miniaturas y lista refinadas.
- Radios, checkbox y selector de idioma consistentes, conservando el funcionamiento existente de transForm.
- Distribución autónoma: no agrega dependencias de PHP, Node.js o Composer a KCFinder en producción.

## Compatibilidad

- KCFinder Resurrected 4.x; la búsqueda optativa por nombres requiere 4.7 o superior.
- Tokens de Bootstrap 5.3.8 y Bootstrap Icons 1.13.1.
- Versiones actuales de Chrome, Edge y Firefox. Safari debería funcionar, pero todavía no forma parte de la prueba habitual.

El tema no cambia los requisitos PHP, autenticación, uploads, permisos ni configuración de seguridad de KCFinder.

En versiones actuales de KCFinder Resurrected, el tema reutiliza el panel móvil y el manejo de foco provistos por el núcleo. Para instalaciones 4.x anteriores conserva un control compatible propio, evitando que una actualización visual obligue a actualizar primero el servidor.

Cuando la búsqueda optativa de KCFinder está habilitada en `conf/config.local.php`, el tema adapta automáticamente el campo, el estado, las coincidencias y los contadores. La ejecución y sus límites continúan siendo configuración del núcleo; el tema no recorre archivos por sí mismo.

## Instalación

### 1. Obtener el tema

Descarga una publicación o clona este repositorio y utiliza la carpeta ya compilada `dist/bootstrap5`.

También puede instalarse mediante Composer:

```bash
composer require krma-cl/kcfinder-bootstrap5-theme:^0.3
```

Copia
`vendor/krma-cl/kcfinder-bootstrap5-theme/dist/bootstrap5` dentro de la carpeta
`themes` de KCFinder. El comando de assets del adaptador Laravel puede
automatizar la publicación dentro de la aplicación.

### 2. Copiar la distribución

Copia la carpeta completa:

```text
dist/bootstrap5
```

dentro de `themes` en tu instalación de KCFinder. La estructura final debe ser:

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

No copies `src`, `scripts`, `node_modules` ni `vendor` al servidor de producción.

### 3. Seleccionar el tema

Configúralo globalmente en `conf/config.php`:

```php
'theme' => 'bootstrap5',
```

Una integración también puede seleccionarlo mediante sesión:

```php
$_SESSION['KCFINDER']['theme'] = 'bootstrap5';
```

El adaptador jQuery de KCFinder acepta la opción `theme`:

```javascript
$('#file-browser').kcfinder({
    url: '/kcfinder/browse.php',
    theme: 'bootstrap5'
});
```

Para una prueba temporal abre:

```text
/kcfinder/browse.php?theme=bootstrap5
```

La opción por URL debe considerarse un mecanismo de vista previa. En producción es preferible utilizar la configuración o la sesión.

### 4. Limpiar la caché generada

Después de instalar o actualizar, elimina estos archivos si existen:

```text
cache/theme_bootstrap5.css
cache/theme_bootstrap5.js
```

KCFinder los vuelve a crear automáticamente. Después de una actualización también puede ser necesario forzar la recarga del navegador.

## Actualización

1. Respalda `themes/bootstrap5` si contiene modificaciones locales.
2. Reemplázala con la nueva carpeta `dist/bootstrap5`.
3. Elimina los dos archivos de caché indicados anteriormente.
4. Recarga KCFinder y comprueba miniaturas, lista, carga de archivos y diálogos.

Evita editar directamente `dist/bootstrap5`. Modifica `src` y recompila para mantener actualizaciones reproducibles.

## Desinstalación

Vuelve a seleccionar el tema `default`, elimina `themes/bootstrap5` y borra los archivos de caché `theme_bootstrap5` que existan.

## Desarrollo

Para desarrollar se requiere Node.js 20 o superior y npm:

```bash
npm ci
npm run build
npm run check
```

El código fuente está en `src`. La compilación lo combina con los recursos de compatibilidad de `vendor/kcfinder` y genera el paquete instalable en `dist/bootstrap5`.

Antes de confirmar cambios ejecuta:

```bash
npm run check
git diff --exit-code -- dist/bootstrap5
```

El segundo comando confirma que la distribución versionada corresponde al código fuente. Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para contribuir.

## Versionado

El tema utiliza versionado semántico independiente de KCFinder. Las versiones de Bootstrap y Bootstrap Icons se fijan en `package.json` y se registran en el changelog.
Cada distribución incluye `VERSION` y `manifest.json`, con las versiones del
tema, Bootstrap y Bootstrap Icons, además de hashes SHA-256 para los archivos
instalables.

## Origen y créditos

- [KCFinder Resurrected](https://github.com/krma-cl/kcfinder-Resurrected), mantenido por krma-cl.
- [KCFinder](https://github.com/sunhater/kcfinder), creado originalmente por Pavel Tzonkov y actualmente archivado.
- [Bootstrap](https://github.com/twbs/bootstrap) y [Bootstrap Icons](https://github.com/twbs/icons), mantenidos por el equipo de Bootstrap.

## Mantenimiento y comunidad

Este tema oficial de KCFinder es mantenido por [KRMA](https://krma.cl) junto con su comunidad de usuarios y colaboradores. KRMA aporta desarrollo, coordinación e infraestructura para asegurar la continuidad del proyecto.

## Licencia

El tema se distribuye bajo `GPL-3.0-or-later OR LGPL-3.0-or-later`, igual que la elección de licencia de KCFinder. Bootstrap y Bootstrap Icons utilizan la licencia MIT. Consulta [LICENSE](LICENSE), los textos completos en [`licenses`](licenses) y [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

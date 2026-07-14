# KCFinder Bootstrap 5 Theme

Tema independiente para KCFinder Resurrected, basado en los tokens y herramientas Sass de Bootstrap 5.3.8. No modifica el núcleo de KCFinder y no requiere Node.js ni Bootstrap en el servidor de producción.

## Requisitos para compilar

- Node.js 20 o superior.
- npm 10 o superior.

## Compilar

```bash
npm ci
npm run build
npm run check
```

El resultado listo para instalar queda en `dist/bootstrap5`.

## Instalar en KCFinder

1. Copia `dist/bootstrap5` dentro de la carpeta `themes` de KCFinder.
2. Configura el tema en la integración o sesión:

```php
$_SESSION['KCFINDER']['theme'] = 'bootstrap5';
```

Para una prueba puntual también puede abrirse `browse.php?theme=bootstrap5` si la instalación permite seleccionar el tema mediante URL.

## Compatibilidad

- KCFinder Resurrected 4.x.
- Bootstrap 5.3.x como base de diseño y compilación.
- Navegadores modernos compatibles con Bootstrap 5.
- Diseño adaptable: en pantallas pequeñas el árbol de carpetas se transforma en un panel lateral.

El tema conserva jQuery UI y transForm porque forman parte del comportamiento interno de KCFinder. Sus controles se presentan con apariencia Bootstrap; no se reemplazan sus APIs ni la lógica heredada.

## Versionado

El proyecto usa versionado semántico propio. La versión de Bootstrap se fija en `package.json` y se documenta en cada publicación. Una actualización de Bootstrap que no cambie la instalación del tema puede publicarse como versión menor; cambios incompatibles requieren una versión mayor.

## Desinstalar

Vuelve a configurar `default` como tema y elimina `themes/bootstrap5`. No se requieren cambios adicionales.

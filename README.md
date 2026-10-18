# Overlays OBS · el_tio_crack

Overlays animados para OBS (HTML/CSS/JS como *Browser Source*), en horizontal 1920×1080 y vertical 1080×1920 (TikTok con Aitum Vertical). Paleta negra/plata con acento dorado.

**Galería en vivo:** https://eltiocrack.github.io/obs-overlays/

## Contenido

| Carpeta | Qué hay |
|---|---|
| `screens/` | Pantallas completas: Inicio (cuenta atrás), Vuelvo enseguida, Gracias por ver, fondo animado, transición |
| `widgets/` | Elementos sobre el juego: EN VIVO, tiempo, reloj, nombre, redes, CTA, metas, contador, encuesta, alertas, marcos con luz girando para juego/cam/chat… |
| `vertical/`, `horizontal/` | Plantillas de layout |
| `shared/` | Estilos, motor de animaciones y `config.js` (todos los textos) |
| `panel/` | Panel de control local para editar `config.js` |

## Usar en OBS

Añade una fuente **Navegador** con:
- **Archivo local:** marca "Archivo local" y elige el `.html`, o
- **URL:** `https://eltiocrack.github.io/obs-overlays/widgets/live.html` (cualquier archivo de la galería).

Tamaño de la fuente = el indicado en la galería (por ejemplo, `600×140`).

## Cambiar textos

- **Local (recomendado):** doble clic en `Panel.bat` → editas en el navegador → **Guardar**. Los overlays se actualizan solos en ~2 s.
- **Desde GitHub:** edita `shared/config.js` y haz commit; las fuentes que usen la URL de GitHub Pages se actualizan al publicarse.
- **Por URL:** cualquier valor se puede forzar con parámetros, p. ej. `screens/starting.html?min=10&game=Minecraft`.

> El panel necesita el servidor local (`panel/server.py`, Python 3). En GitHub Pages la galería y los overlays funcionan, pero el botón Guardar del panel no.

## Opciones útiles

- `?motion=low` reduce las animaciones.
- `vertical/layout.html?guides=1` muestra las zonas seguras de TikTok.
- `widgets/alert.html?demo=1` y `widgets/counter.html?demo=1` muestran demos.

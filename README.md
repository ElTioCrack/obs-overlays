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

## Cambiar textos (panel de control)

El panel tiene editores fáciles: listas con **＋ Añadir**, **🗑 eliminar**, **↑ ↓** y **arrastrar ⠿**; redes con desplegable; encuesta con % y "Repartir igual"; metas con − / +; cuenta atrás con botones de 3–20 min; palabra dorada con un clic; **vista previa en vivo** sin guardar; deshacer/rehacer (Ctrl+Z / Ctrl+Y); presets; exportar/importar.

- **Local:** doble clic en `Panel.bat` (primero descarga lo último de GitHub). Al guardar, OBS se actualiza en ~2 s. En **Más ▾** puedes activar *Subir a GitHub al guardar*.
- **Web:** https://eltiocrack.github.io/obs-overlays/panel/ → **Más ▾ → Conectar GitHub** y pega un *fine-grained token* con permiso **Contents: Read and write** solo para este repo. Se guarda únicamente en tu navegador. Al guardar se hace un commit; las fuentes de OBS que usen la URL de GitHub Pages lo ven en 1–2 min.
- **Por URL:** cualquier valor se puede forzar con parámetros, p. ej. `screens/starting.html?min=10&game=Minecraft`.

## Opciones útiles

- `?motion=low` reduce las animaciones.
- `vertical/layout.html?guides=1` muestra las zonas seguras de TikTok.
- `widgets/alert.html?demo=1` y `widgets/counter.html?demo=1` muestran demos.

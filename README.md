# WhatsApp Image Rotator

Extensión Manifest V3 para Chrome y Microsoft Edge. Añade controles al visor de imágenes de WhatsApp Web y aplica la rotación directamente al `div[data-testid="media-zoomable"]`, sin descargar ni modificar el archivo enviado o recibido. La imagen contenida en el visor se usa únicamente para detectar la navegación y restablecer el ángulo.

## Desarrollo y compilación

Requiere Node.js compatible con Vite y `pnpm`.

```powershell
pnpm install
pnpm build
```

La compilación genera la extensión lista para cargar en `dist\`.

## Instalación en Chrome

1. Ejecuta `pnpm build`.
2. Abre `chrome://extensions`.
3. Activa **Developer mode**.
4. Selecciona **Load unpacked** y elige la carpeta `dist`.
5. Abre o recarga WhatsApp Web en `https://web.whatsapp.com/`.

## Instalación en Microsoft Edge

1. Ejecuta `pnpm build`.
2. Abre `edge://extensions`.
3. Activa **Developer mode**.
4. Selecciona **Load unpacked** y elige la carpeta `dist`.
5. Abre o recarga WhatsApp Web en `https://web.whatsapp.com/`.

## Uso

Al abrir una imagen, los controles se insertan antes del `div[title="Zoom out"]` nativo cuando está disponible. Si WhatsApp elimina ese `title` al ampliar, la extensión busca `button[aria-label="Zoom out"]` y coloca los controles antes de su ancestro situado tres niveles arriba. Si tampoco encuentra ese ancla, aparece una barra flotante en la esquina inferior derecha. Rotar a la izquierda o derecha añade 90°, el botón de 180° añade media vuelta y **Reset rotation** vuelve a la orientación original. La rotación se reinicia al cambiar de imagen o cerrar el visor.

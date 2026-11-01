# WhatsApp Image Rotator

Extensión Manifest V3 para Chrome y Microsoft Edge. Añade controles al visor de imágenes de WhatsApp Web y aplica la rotación directamente al `div[data-testid="media-zoomable"]`, sin descargar ni modificar el archivo enviado o recibido. La imagen contenida en el visor se usa únicamente para detectar la navegación y restablecer el ángulo.

## Licencia

Este proyecto se distribuye bajo una **licencia propietaria de uso personal**. Se permite instalar, utilizar y modificar el código para uso personal y no comercial, pero no redistribuir, publicar, compartir ni vender el proyecto o versiones modificadas sin autorización escrita del titular de los derechos.

Consulta los términos completos en [LICENSE.md](./LICENSE.md). Los componentes de terceros continúan sujetos a sus respectivas licencias.

## Aviso sobre el uso de inteligencia artificial

Todo el código de este proyecto fue generado mediante herramientas de inteligencia artificial (IA) y no ha sido revisado ni auditado por un desarrollador humano. Puede contener errores, defectos, problemas de compatibilidad o vulnerabilidades. Consulta [DISCLAIMER.md](./DISCLAIMER.md) antes de utilizarlo.

## Desarrollo y compilación

Requiere Node.js compatible con Vite y `pnpm`.

```powershell
pnpm install
pnpm build
```

La compilación genera la extensión lista para cargar en `dist\\`.

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

Al abrir una imagen, los controles se insertan antes del control nativo cuyo `title` indique alejar/reducir zoom en inglés, español, portugués, francés, italiano o alemán. Si WhatsApp elimina ese `title` al ampliar, la extensión busca el `button[aria-label]` localizado y coloca los controles antes de su ancestro situado tres niveles arriba. Si tampoco encuentra ese ancla, aparece una barra flotante en la esquina inferior derecha. Rotar a la izquierda o derecha añade 90°, el botón de 180° añade media vuelta y **Reset rotation** vuelve a la orientación original. La rotación se reinicia al cambiar de imagen o cerrar el visor.

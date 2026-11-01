# WhatsApp Image Rotator

A Manifest V3 extension for Google Chrome and Microsoft Edge. It adds rotation controls to the WhatsApp Web image viewer and applies rotation directly to the `div[data-testid="media-zoomable"]` element, without downloading or modifying the original image file. The image displayed in the viewer is used only to detect image navigation and reset the rotation angle.

## License

This project is distributed under a **proprietary personal-use license**. You may install, use, and modify the code for your own personal, non-commercial purposes. You may not redistribute, publish, share, or sell the project or modified versions without prior written permission from the copyright holder.

See [LICENSE.md](./LICENSE.md) for the complete terms. Third-party components remain subject to their respective licenses.

## AI-Generated Code Notice

All code in this project was generated using artificial intelligence (AI) tools and has not been reviewed or audited by a human software developer. It may contain bugs, defects, compatibility issues, or security vulnerabilities. Read [DISCLAIMER.md](./DISCLAIMER.md) before installing or using the extension.

## Development and Build

Requires a Node.js version compatible with Vite and `pnpm`.

```powershell
pnpm install
pnpm build
```

The build process generates the extension package in the `dist/` directory.

## Installation in Chrome

1. Run `pnpm build`.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Select **Load unpacked** and choose the `dist` directory.
5. Open or reload WhatsApp Web at `https://web.whatsapp.com/`.

## Installation in Microsoft Edge

1. Run `pnpm build`.
2. Open `edge://extensions`.
3. Enable **Developer mode**.
4. Select **Load unpacked** and choose the `dist` directory.
5. Open or reload WhatsApp Web at `https://web.whatsapp.com/`.

## Usage

When an image is opened, the extension attempts to insert its controls before the native control whose `title` indicates zooming out in English, Spanish, Portuguese, French, Italian, or German. If WhatsApp removes that `title` when the image is enlarged, the extension looks for a localized `button[aria-label]` and inserts the controls before an ancestor three levels above it. If neither anchor is found, a floating toolbar appears in the bottom-right corner.

The left and right rotation buttons rotate the image by 90 degrees. The 180-degree button rotates it by half a turn, and **Reset rotation** restores the original orientation. Rotation is reset when the displayed image changes or the viewer is closed.

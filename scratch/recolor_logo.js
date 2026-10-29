const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// RGB to HSL and HSL to RGB conversion
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

async function transformLogo() {
  const inputPath = path.join(__dirname, '..', 'public', 'assets', 'logo_temp.png');
  const outPng = path.join(__dirname, '..', 'public', 'assets', 'logo.png');
  const outWebp = path.join(__dirname, '..', 'public', 'assets', 'logo.webp');

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // We want to transform the blue/cyan hues (~190° - 230°, or 0.52 - 0.64 in 0..1 scale)
  // to the website's emerald / teal theme (~160° - 175°, or 0.44 - 0.49 in 0..1 scale)
  // While preserving white ("Web" and "Your Digital Partner") and transparent background.
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a < 10) continue; // transparent pixel

    const [h, s, l] = rgbToHsl(r, g, b);

    // If it's a colored pixel (not pure white / grey)
    if (s > 0.25) {
      // Map blue (~0.55 to 0.63) into Emerald / Mint / Teal theme (~0.43 to 0.48)
      // Old blue is around 0.58. New emerald is around 0.44.
      const targetHue = 0.44 + (h - 0.58) * 0.5;
      const [newR, newG, newB] = hslToRgb(targetHue, Math.min(1, s * 1.05), l);
      data[i] = newR;
      data[i + 1] = newG;
      data[i + 2] = newB;
    }
  }

  // Save as high-res PNG without background
  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(outPng);

  // Also save/update logo.webp without background for Next.js image loading
  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 90 })
    .toFile(outWebp);

  console.log(`Logo successfully recolored to Emerald/Teal theme and saved to ${outPng} and ${outWebp}`);
}

transformLogo();

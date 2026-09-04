import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../../');
const publicDir = path.join(rootDir, 'public');
const iconsDir = path.join(publicDir, 'icons');
const imagesDir = path.join(publicDir, 'images');
const sourceIglesia = path.join(imagesDir, 'iglesia-cercadillo-original.png');

async function main() {
  await fs.mkdir(iconsDir, { recursive: true });
  await fs.mkdir(imagesDir, { recursive: true });

  console.log('Generating app icons from the photo of the Iglesia de la Natividad de Cercadillo...');

  // Square, center-cropped master used everywhere below (photo fills the frame, no padding needed).
  const squareMasterBuffer = await sharp(sourceIglesia)
    .resize(1024, 1024, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 92 })
    .toBuffer();
  const base64Iglesia = `data:image/jpeg;base64,${squareMasterBuffer.toString('base64')}`;

  // 1. Apple Touch Icon (180x180) & variants for iOS Home Screen & Safari Bookmarks
  const appleSizes = [180, 167, 152, 120];
  for (const size of appleSizes) {
    const appleIconBuffer = await sharp(squareMasterBuffer)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .png()
      .toBuffer();

    if (size === 180) {
      await fs.writeFile(path.join(iconsDir, 'apple-touch-icon.png'), appleIconBuffer);
      await fs.writeFile(path.join(iconsDir, 'apple-touch-icon-180x180.png'), appleIconBuffer);
    } else {
      await fs.writeFile(path.join(iconsDir, `apple-touch-icon-${size}x${size}.png`), appleIconBuffer);
    }
  }

  // 2. Android / PWA standard icons (512x512 down to 48x48)
  const pwaSizes = [512, 192, 144, 96, 72, 48];
  for (const size of pwaSizes) {
    const iconBuffer = await sharp(squareMasterBuffer)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .png()
      .toBuffer();

    await fs.writeFile(path.join(iconsDir, `icon-${size}.png`), iconBuffer);
  }

  // 3. Android Maskable Icon (512x512, photo fills the safe zone with a little breathing room)
  const maskablePhoto = await sharp(squareMasterBuffer)
    .resize(400, 400, { fit: 'cover', position: 'centre' })
    .toBuffer();

  const maskableIconBuffer = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 38, g: 38, b: 36, alpha: 1 }, // neutral dark, matches --color-pergamino
    },
  })
    .composite([{ input: maskablePhoto, gravity: 'center' }])
    .png()
    .toBuffer();

  await fs.writeFile(path.join(iconsDir, 'icon-maskable-512.png'), maskableIconBuffer);

  // 4. Favicons (16x16, 32x32, 48x48)
  const favBuffers = [];
  for (const size of [16, 32, 48]) {
    const favBuffer = await sharp(squareMasterBuffer)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toBuffer();
    await fs.writeFile(path.join(iconsDir, `favicon-${size}.png`), favBuffer);
    favBuffers.push({ size, buffer: favBuffer });
    if (size === 32) {
      await fs.writeFile(path.join(publicDir, 'favicon.png'), favBuffer);
    }
  }

  // Generate public/favicon.ico containing 16, 32, 48 PNGs
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // icon type
  icoHeader.writeUInt16LE(favBuffers.length, 4); // count

  let offset = 6 + favBuffers.length * 16;
  const dirEntries = [];
  for (const { size, buffer } of favBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // size of image
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += buffer.length;
  }

  const icoBuffer = Buffer.concat([icoHeader, ...dirEntries, ...favBuffers.map((f) => f.buffer)]);
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), icoBuffer);

  // 5. Vector Favicon SVG: circular framed photo of the church, gold ring border
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <clipPath id="circle-clip">
      <circle cx="64" cy="64" r="58" />
    </clipPath>
    <linearGradient id="gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4A359" />
      <stop offset="50%" stop-color="#F9E5BD" />
      <stop offset="100%" stop-color="#B88432" />
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="#262624"/>
  <circle cx="64" cy="64" r="59" fill="none" stroke="url(#gold-border)" stroke-width="3"/>
  <g clip-path="url(#circle-clip)">
    <image href="${base64Iglesia}" x="6" y="6" width="116" height="116" preserveAspectRatio="xMidYMid slice"/>
  </g>
</svg>`;
  await fs.writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg);

  // 6. OpenGraph / Twitter / Rich Bookmark preview image (1200x630): circular church photo + "Cercadillo"
  console.log('Generating 1200x630 OpenGraph and rich sharing banner with the church photo + name...');

  const ogPhotoSize = 390;
  const ogPhotoSquare = await sharp(squareMasterBuffer)
    .resize(ogPhotoSize, ogPhotoSize, { fit: 'cover', position: 'centre' })
    .toBuffer();
  const ogPhotoCircular = await sharp(ogPhotoSquare)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${ogPhotoSize}" height="${ogPhotoSize}"><circle cx="${ogPhotoSize / 2}" cy="${ogPhotoSize / 2}" r="${ogPhotoSize / 2}" fill="#fff"/></svg>`
        ),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  const ogSvgOverlay = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold-text" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4A359" />
      <stop offset="100%" stop-color="#E6C88F" />
    </linearGradient>
    <linearGradient id="sub-text" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FDFBF7" />
      <stop offset="100%" stop-color="#F7F4EC" />
    </linearGradient>
  </defs>

  <!-- Gold ring around the circular photo -->
  <circle cx="260" cy="315" r="199" fill="none" stroke="#D4A359" stroke-width="3" opacity="0.75" />

  <!-- Golden decorative line -->
  <line x1="500" y1="315" x2="1120" y2="315" stroke="#D4A359" stroke-width="2" opacity="0.6" />

  <!-- Main Title -->
  <text x="500" y="230" font-family="Georgia, 'Cinzel', 'Playfair Display', serif" font-size="82" font-weight="bold" fill="url(#sub-text)" letter-spacing="3">CERCADILLO</text>

  <!-- Subtitle -->
  <text x="500" y="285" font-family="Georgia, 'Cinzel', serif" font-size="21" font-weight="600" fill="url(#gold-text)" letter-spacing="2">HISTORIA · LUGARES · CURIOSIDADES</text>

  <!-- Descriptive tags -->
  <text x="500" y="370" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#E8E0CE" opacity="0.95" font-weight="500">Historia · Lugares · Tradición · Curiosidades</text>
  <text x="500" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="19" fill="#D4A359" opacity="0.85">Pedanía de Sigüenza · Guadalajara</text>
</svg>`;

  // Create high-res 1200x630 background with deep warm slate palette and glow behind the photo
  const ogBgBuffer = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 36, g: 30, b: 24, alpha: 1 }, // #241e18
    },
  })
    .composite([
      {
        input: Buffer.from(`
          <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
            <radialGradient id="glow" cx="260" cy="315" r="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#8C4A32" stop-opacity="0.35" />
              <stop offset="60%" stop-color="#B88432" stop-opacity="0.12" />
              <stop offset="100%" stop-color="#1C1814" stop-opacity="0" />
            </radialGradient>
            <rect width="1200" height="630" fill="url(#glow)" />
            <!-- Subtle frame border -->
            <rect x="20" y="20" width="1160" height="590" rx="16" fill="none" stroke="#D4A359" stroke-width="1.5" stroke-opacity="0.3" />
          </svg>
        `),
        top: 0,
        left: 0,
      },
      {
        input: ogPhotoCircular,
        top: 120,
        left: 65,
      },
      {
        input: Buffer.from(ogSvgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  await fs.writeFile(path.join(imagesDir, 'og-default.png'), ogBgBuffer);

  // Also write SVG version of og-default
  const ogSvgFull = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg-glow" cx="260" cy="315" r="420" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8C4A32" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#B88432" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#1C1814" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="gold-text" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4A359" />
      <stop offset="100%" stop-color="#E6C88F" />
    </linearGradient>
    <linearGradient id="sub-text" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FDFBF7" />
      <stop offset="100%" stop-color="#F7F4EC" />
    </linearGradient>
    <clipPath id="og-circle-clip">
      <circle cx="260" cy="315" r="195" />
    </clipPath>
  </defs>

  <rect width="1200" height="630" fill="#241E18"/>
  <rect width="1200" height="630" fill="url(#bg-glow)" />
  <rect x="20" y="20" width="1160" height="590" rx="16" fill="none" stroke="#D4A359" stroke-width="1.5" stroke-opacity="0.3" />

  <!-- Circular photo of the church -->
  <g clip-path="url(#og-circle-clip)">
    <image href="${base64Iglesia}" x="65" y="120" width="390" height="390" preserveAspectRatio="xMidYMid slice"/>
  </g>
  <circle cx="260" cy="315" r="199" fill="none" stroke="#D4A359" stroke-width="3" opacity="0.75" />

  <!-- Divider -->
  <line x1="500" y1="315" x2="1120" y2="315" stroke="#D4A359" stroke-width="2" opacity="0.6" />

  <!-- Main Title -->
  <text x="500" y="230" font-family="Georgia, 'Cinzel', 'Playfair Display', serif" font-size="82" font-weight="bold" fill="url(#sub-text)" letter-spacing="3">CERCADILLO</text>

  <!-- Subtitle -->
  <text x="500" y="285" font-family="Georgia, 'Cinzel', serif" font-size="21" font-weight="600" fill="url(#gold-text)" letter-spacing="2">HISTORIA · LUGARES · CURIOSIDADES</text>

  <!-- Descriptive tags -->
  <text x="500" y="370" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#E8E0CE" opacity="0.95" font-weight="500">Historia · Lugares · Tradición · Curiosidades</text>
  <text x="500" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="19" fill="#D4A359" opacity="0.85">Pedanía de Sigüenza · Guadalajara</text>
</svg>`;
  await fs.writeFile(path.join(imagesDir, 'og-default.svg'), ogSvgFull);

  console.log('All icons and rich banners generated successfully!');
}

main().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});

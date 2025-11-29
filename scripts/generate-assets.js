/**
 * Asset Generation Script
 *
 * This script generates the required image assets for the site.
 * Run with: node scripts/generate-assets.js
 *
 * Note: For production, you should create proper PNG files using a design tool.
 * This script creates placeholder SVGs that work but should be replaced with
 * professionally designed assets for better branding.
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// favicon.svg (32x32 for browsers)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#2563eb"/>
  <text x="16" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">CH</text>
</svg>`;

// Large icon for apple-touch-icon (180x180)
const appleTouchIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="36" fill="#2563eb"/>
  <text x="90" y="115" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">CH</text>
</svg>`;

// Logo (horizontal)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60">
  <rect x="5" y="5" width="50" height="50" rx="10" fill="#2563eb"/>
  <text x="30" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">CH</text>
  <text x="65" y="40" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1f2937">CalcHub</text>
</svg>`;

// OG Image (1200x630) - Social sharing image
const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af"/>
      <stop offset="100%" style="stop-color:#3b82f6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Logo icon -->
  <rect x="100" y="215" width="120" height="120" rx="24" fill="white"/>
  <text x="160" y="295" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="#2563eb" text-anchor="middle">CH</text>

  <!-- Main text -->
  <text x="250" y="260" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white">CalcHub</text>
  <text x="250" y="320" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)">Free Online Calculators</text>

  <!-- Features -->
  <text x="100" y="450" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)">200+ Calculators</text>
  <text x="100" y="490" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)">Math • Finance • Health • More</text>

  <!-- URL -->
  <text x="100" y="580" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.7)">calchub.com</text>

  <!-- Calculator icons decoration -->
  <g fill="rgba(255,255,255,0.1)">
    <rect x="900" y="100" width="80" height="100" rx="8"/>
    <rect x="1000" y="150" width="80" height="100" rx="8"/>
    <rect x="950" y="280" width="80" height="100" rx="8"/>
    <rect x="1050" y="320" width="80" height="100" rx="8"/>
    <rect x="880" y="400" width="80" height="100" rx="8"/>
    <rect x="1000" y="450" width="80" height="100" rx="8"/>
  </g>
</svg>`;

// Write files
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), appleTouchIconSvg);
fs.writeFileSync(path.join(publicDir, 'logo.svg'), logoSvg);
fs.writeFileSync(path.join(publicDir, 'og-image.svg'), ogImageSvg);

console.log('Assets generated successfully!');
console.log('');
console.log('Generated files:');
console.log('  - public/favicon.svg');
console.log('  - public/apple-touch-icon.svg');
console.log('  - public/logo.svg');
console.log('  - public/og-image.svg');
console.log('');
console.log('Note: For production, convert these SVGs to PNG:');
console.log('  - og-image.svg -> og-image.png (1200x630)');
console.log('  - apple-touch-icon.svg -> apple-touch-icon.png (180x180)');
console.log('  - favicon.svg -> favicon.ico (32x32)');
console.log('');
console.log('You can use tools like:');
console.log('  - https://cloudconvert.com/svg-to-png');
console.log('  - https://favicon.io/favicon-converter/');

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// This script converts og-image.svg to og-image.png using sharp
// First, install sharp if not already installed

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'og-image.svg');
const pngPath = path.join(publicDir, 'og-image.png');

async function convertSvgToPng() {
  try {
    // Check if sharp is available, if not suggest installation
    let sharp;
    try {
      sharp = require('sharp');
    } catch (e) {
      console.log('Installing sharp for image conversion...');
      execSync('npm install sharp', { stdio: 'inherit' });
      sharp = require('sharp');
    }

    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
      console.error('Error: og-image.svg not found in public directory');
      process.exit(1);
    }

    console.log('Converting og-image.svg to og-image.png (1200x630)...');

    // Read SVG and convert to PNG
    await sharp(svgPath)
      .resize(1200, 630)
      .png()
      .toFile(pngPath);

    console.log('Successfully created og-image.png!');
    console.log(`Output: ${pngPath}`);

    // Verify file size
    const stats = fs.statSync(pngPath);
    console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error('Error converting image:', error.message);
    process.exit(1);
  }
}

convertSvgToPng();

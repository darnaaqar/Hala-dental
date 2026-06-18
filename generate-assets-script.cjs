const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  console.log('Generating high-resolution PNG source assets from Hala Dent logo...');

  // Ensure assets folder exists
  if (!fs.existsSync('./assets')) {
    fs.mkdirSync('./assets', { recursive: true });
  }

  const logoPath = './src/assets/images/hala_dent_logo_1_1781652549570.jpg';

  if (!fs.existsSync(logoPath)) {
    console.error(`Source logo not found at: ${logoPath}`);
    process.exit(1);
  }

  try {
    // 1. Generate icon-only.png (1024x1024 with white background)
    await sharp(logoPath)
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile('./assets/icon-only.png');
    console.log('✔ Created assets/icon-only.png');

    // 2. Generate icon-foreground.png (1024x1024 transparent padding)
    await sharp(logoPath)
      .resize(750, 750, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: 137,
        bottom: 137,
        left: 137,
        right: 137,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .resize(1024, 1024)
      .toFile('./assets/icon-foreground.png');
    console.log('✔ Created assets/icon-foreground.png');

    // 3. Generate icon-background.png (1024x1024 solid `#ffffff`)
    await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .png()
      .toFile('./assets/icon-background.png');
    console.log('✔ Created assets/icon-background.png');

    // 4. Generate splash.png (2732x2732 with logo centered on white background)
    const logoBufferSplash = await sharp(logoPath)
      .resize(1100, 1100, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toBuffer();

    await sharp({
      create: {
        width: 2732,
        height: 2732,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{ input: logoBufferSplash, gravity: 'center' }])
      .png()
      .toFile('./assets/splash.png');
    console.log('✔ Created assets/splash.png');

    // 5. Generate splash-dark.png (2732x2732 with logo centered on dark background)
    const logoBufferSplashDark = await sharp(logoPath)
      .resize(1100, 1100, {
        fit: 'contain',
        background: { r: 15, g: 23, b: 42, alpha: 1 } // slate-900
      })
      .toBuffer();

    await sharp({
      create: {
        width: 2732,
        height: 2732,
        channels: 4,
        background: { r: 15, g: 23, b: 42, alpha: 1 } // slate-900
      }
    })
      .composite([{ input: logoBufferSplashDark, gravity: 'center' }])
      .png()
      .toFile('./assets/splash-dark.png');
    console.log('✔ Created assets/splash-dark.png');

    console.log('Assets successfully pre-processed in /assets directory!');
  } catch (error) {
    console.error('Error processing logos:', error);
    process.exit(1);
  }
}

main();

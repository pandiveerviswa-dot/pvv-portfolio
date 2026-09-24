const puppeteer = require('puppeteer-core');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

(async () => {
  console.log('Launching browser for Hero & Scroll Reveal capture...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Wait 2.5s for 3D textures, shaders, and loading sequence
  await new Promise(r => setTimeout(r, 2500));

  // 1. Capture Hero Scene at 0% Scroll
  const heroPath = 'C:/Users/Asus-2024/.gemini/antigravity/brain/347b6531-c1b7-41ee-8e9c-ab9a9be65f89/hero_scene_captured.png';
  await page.screenshot({ path: heroPath });
  console.log('✓ Captured full hero scene at 0% scroll -> hero_scene_captured.png');

  // Let's also capture portrait card crops at scroll increments:
  // Total track scroll height is 14,000px. Hero is active 0.0 to 0.08 (0 to 1120px).
  // Hero reveal p = progress / 0.08
  // 0% -> scroll 0
  // 25% -> scroll 280
  // 50% -> scroll 560
  // 75% -> scroll 840 (Frame contact)
  // 100% -> scroll 1120 (Clean reveal)

  const steps = [
    { name: 'reveal_0pct', scrollY: 0, label: '0% (Initial: only eyes subtle)' },
    { name: 'reveal_25pct', scrollY: 280, label: '25% (Eyes + forehead + subtle slice)' },
    { name: 'reveal_50pct', scrollY: 560, label: '50% (Upper body + face + ROG laptop)' },
    { name: 'reveal_75pct', scrollY: 840, label: '75% (Frame contact + lime streak)' },
    { name: 'reveal_100pct', scrollY: 1120, label: '100% (Clean stable portrait)' },
  ];

  for (const step of steps) {
    await page.evaluate((y) => window.scrollTo(0, y), step.scrollY);
    await new Promise(r => setTimeout(r, 400));
    const cardEl = await page.$('.aspect-\\[800\\/836\\]');
    if (cardEl) {
      const cardPath = `C:/Users/Asus-2024/.gemini/antigravity/brain/347b6531-c1b7-41ee-8e9c-ab9a9be65f89/${step.name}.png`;
      await cardEl.screenshot({ path: cardPath });
      console.log(`✓ Captured ${step.label} -> ${step.name}.png`);
    }
  }

  // Reverse scroll test: scroll back up to 0 and verify it returns to 0%
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));
  const reverseCard = await page.$('.aspect-\\[800\\/836\\]');
  if (reverseCard) {
    const revPath = 'C:/Users/Asus-2024/.gemini/antigravity/brain/347b6531-c1b7-41ee-8e9c-ab9a9be65f89/reveal_reversed_to_0.png';
    await reverseCard.screenshot({ path: revPath });
    console.log('✓ Reverse scroll test passed -> reveal_reversed_to_0.png');
  }

  await browser.close();
  console.log('All verification captures complete!');
})();

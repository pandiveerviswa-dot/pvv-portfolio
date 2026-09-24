const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://localhost:3000/';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-sandbox', '--enable-webgl'],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 3500)); // wait for 3D textures to load

  const outPath = 'C:\\Users\\Asus-2024\\.gemini\\antigravity\\brain\\347b6531-c1b7-41ee-8e9c-ab9a9be65f89\\hero_scene_captured.png';
  await page.screenshot({ path: outPath, fullPage: false });
  console.log(`Screenshot saved to ${outPath}`);

  await browser.close();
}

capture();

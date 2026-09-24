const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function scan() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-sandbox', '--enable-webgl'],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3500));

  // Let's take a screenshot to see current state
  await page.screenshot({ path: 'C:\\Users\\Asus-2024\\.gemini\\antigravity\\brain\\347b6531-c1b7-41ee-8e9c-ab9a9be65f89\\test_current.png' });
  console.log('Saved test_current.png');

  await browser.close();
}
scan();

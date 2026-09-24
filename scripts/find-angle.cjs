const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testAngles() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-sandbox', '--enable-webgl'],
    defaultViewport: { width: 800, height: 600 },
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  // Access Three.js earthGroupRef or test angles by evaluating in page
  // We can query the canvas or inspect
  await browser.close();
}
testAngles();

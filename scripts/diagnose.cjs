const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function diagnose() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await sleep(2500);

  console.log('--- Initial State ---');
  let state = await page.evaluate(() => {
    return {
      scrollY: window.scrollY,
      innerHeight: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight,
      bodyTextSnippet: document.body.innerText.slice(0, 300),
    };
  });
  console.log(state);

  console.log('\n--- Clicking CAPABILITIES ---');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find((b) => b.innerText.trim() === 'CAPABILITIES');
    if (btn) btn.click();
  });

  for (let i = 1; i <= 6; i++) {
    await sleep(500);
    const stepState = await page.evaluate(() => {
      const sec = document.querySelector('section');
      return {
        scrollY: window.scrollY,
        bodyTextSnippet: document.body.innerText.replace(/\s+/g, ' ').slice(0, 200),
        sectionStyles: sec ? {
          opacity: sec.style.opacity,
          display: sec.style.display,
          visibility: sec.style.visibility,
          transform: sec.style.transform,
        } : 'No section found',
      };
    });
    console.log(`t = ${i * 0.5}s:`, stepState);
  }

  console.log('\n--- Clicking WORK ---');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find((b) => b.innerText.trim() === 'WORK');
    if (btn) btn.click();
  });

  for (let i = 1; i <= 6; i++) {
    await sleep(500);
    const stepState = await page.evaluate(() => {
      const sec = document.querySelector('section');
      return {
        scrollY: window.scrollY,
        bodyTextSnippet: document.body.innerText.replace(/\s+/g, ' ').slice(0, 200),
        sectionStyles: sec ? {
          opacity: sec.style.opacity,
          display: sec.style.display,
          visibility: sec.style.visibility,
        } : 'No section found',
      };
    });
    console.log(`t = ${i * 0.5}s:`, stepState);
  }

  await browser.close();
}

diagnose().catch(console.error);

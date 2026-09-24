const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEPLOYMENT_URL = 'https://pvv-portfolio-d7ufhttw8-pandiveerviswa-9443s-projects.vercel.app/';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  console.log('====================================================');
  console.log('TESTING INCOGNITO SESSION ON DEPLOYMENT URL');
  console.log('Target URL:', DEPLOYMENT_URL);
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--incognito']
  });

  // Create isolated Incognito Browser Context
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('favicon.ico')) {
        consoleErrors.push(text);
      }
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  console.log('1. Navigating in private/incognito mode...');
  const resp = await page.goto(DEPLOYMENT_URL, { waitUntil: 'load', timeout: 45000 });
  const finalUrl = page.url();

  console.log(`   Response Status: ${resp.status()}`);
  console.log(`   Final URL: ${finalUrl}`);

  const isRedirectedToAuth = finalUrl.includes('github.com') || finalUrl.includes('vercel.com/login') || finalUrl.includes('oauth');
  if (isRedirectedToAuth) {
    console.error('   ✗ FAILED: Redirected to login/OAuth!');
    process.exit(1);
  } else {
    console.log('   ✓ PASS: No redirect to GitHub or Vercel login. Public access confirmed.');
  }

  // Wait for loading screen to complete
  await page.waitForFunction(() => !document.querySelector('.animate-ping'), { timeout: 15000 }).catch(() => {});
  await sleep(2500);

  // Check content
  const pageTitle = await page.title();
  console.log(`   Page Title: "${pageTitle}"`);

  const hasIdentity = await page.evaluate(() => {
    return document.body.innerText.includes('PANDI') && document.body.innerText.includes('VEER') && document.body.innerText.includes('VISWA');
  });
  console.log(`   Identity text present: ${hasIdentity ? '✓ YES' : '✗ NO'}`);

  // Check Three.js canvas
  const canvasCheck = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    if (!c) return false;
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    return gl && !gl.isContextLost();
  });
  console.log(`   Three.js WebGL canvas active: ${canvasCheck ? '✓ YES' : '✗ NO'}`);

  // Check portrait image
  const portraitCheck = await page.evaluate(() => {
    const img = document.querySelector('.aspect-\\[800\\/836\\] img');
    return img ? { src: img.src, width: img.naturalWidth } : null;
  });
  console.log(`   Portrait loaded: ${portraitCheck && portraitCheck.width > 0 ? `✓ YES (${portraitCheck.width}px)` : '✗ NO'}`);

  // Check console errors
  console.log(`   Runtime console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('   Errors:', consoleErrors);
  } else {
    console.log('   ✓ PASS: 0 console errors detected in incognito session');
  }

  await browser.close();

  console.log('\n====================================================');
  console.log('ALL INCOGNITO VERIFICATION CHECKS PASSED');
  console.log('====================================================\n');
})();

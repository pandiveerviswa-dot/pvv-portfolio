const fs = require('fs');
const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const exe = fs.existsSync(chromePath) ? chromePath : edgePath;

(async () => {
  const browser = await puppeteer.launch({ executablePath: exe, headless: true });
  const page = await browser.newPage();
  const imgPath = 'C:/Users/Asus-2024/.gemini/antigravity/brain/347b6531-c1b7-41ee-8e9c-ab9a9be65f89/.user_uploaded/media_1790172019299.jpg';
  const imgB64 = fs.readFileSync(imgPath).toString('base64');
  await page.setContent(`<img id="ref" src="data:image/jpeg;base64,${imgB64}" />`);
  const dims = await page.evaluate(() => {
    const img = document.getElementById('ref');
    return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
  });
  console.log('Dimensions:', dims);
  await browser.close();
})();

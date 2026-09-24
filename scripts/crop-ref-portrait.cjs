const fs = require('fs');
const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const exe = fs.existsSync(chromePath) ? chromePath : edgePath;

(async () => {
  const browser = await puppeteer.launch({ executablePath: exe, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 640 });
  const imgPath = 'C:/Users/Asus-2024/.gemini/antigravity/brain/347b6531-c1b7-41ee-8e9c-ab9a9be65f89/.user_uploaded/media_1790172019299.jpg';
  const imgB64 = fs.readFileSync(imgPath).toString('base64');

  await page.setContent(`
    <style>body { margin: 0; background: black; }</style>
    <canvas id="c" width="1024" height="640"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // In 1024x640:
        // Card is roughly around x: 670 to 975, y: 155 to 520
        // Photo inside card is roughly x: 690 to 960, y: 200 to 480
        const photoCanvas = document.createElement('canvas');
        photoCanvas.width = 280;
        photoCanvas.height = 300;
        const pctx = photoCanvas.getContext('2d');
        pctx.drawImage(c, 680, 190, 280, 300, 0, 0, 280, 300);
        window.photoData = photoCanvas.toDataURL('image/png');
      };
      img.src = "data:image/jpeg;base64,${imgB64}";
    </script>
  `);

  await page.waitForFunction('window.photoData');
  const dataUrl = await page.evaluate(() => window.photoData);
  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('C:/Users/Asus-2024/.gemini/antigravity/brain/347b6531-c1b7-41ee-8e9c-ab9a9be65f89/crop_portrait_ref.png', base64Data, 'base64');
  console.log('Saved crop_portrait_ref.png');
  await browser.close();
})();

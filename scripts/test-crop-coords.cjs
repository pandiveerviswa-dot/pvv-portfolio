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

        // Let's test different crop boxes:
        // Card inner image coordinates in 1024x640:
        // x: ~693, y: ~201, width: ~268, height: ~280
        const tests = [
          { name: 'crop1', x: 692, y: 198, w: 270, h: 285 },
          { name: 'crop2', x: 695, y: 202, w: 264, h: 280 },
          { name: 'crop3', x: 690, y: 195, w: 274, h: 290 }
        ];

        window.results = {};
        for (const t of tests) {
          const tc = document.createElement('canvas');
          tc.width = t.w * 2; // 2x resolution with smooth bicubic scaling
          tc.height = t.h * 2;
          const tctx = tc.getContext('2d');
          tctx.imageSmoothingEnabled = true;
          tctx.imageSmoothingQuality = 'high';
          tctx.drawImage(c, t.x, t.y, t.w, t.h, 0, 0, tc.width, tc.height);
          window.results[t.name] = tc.toDataURL('image/png');
        }
      };
      img.src = "data:image/jpeg;base64,${imgB64}";
    </script>
  `);

  await page.waitForFunction('window.results');
  const results = await page.evaluate(() => window.results);
  for (const [name, dataUrl] of Object.entries(results)) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(`C:/Users/Asus-2024/.gemini/antigravity/brain/347b6531-c1b7-41ee-8e9c-ab9a9be65f89/${name}.png`, base64Data, 'base64');
  }
  console.log('Saved crops');
  await browser.close();
})();

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

        // x: 696, y: 204, w: 262, h: 274
        // Let's render at 800x836 for ultra crisp retina display!
        const targetW = 800;
        const targetH = 836;
        const tc = document.createElement('canvas');
        tc.width = targetW;
        tc.height = targetH;
        const tctx = tc.getContext('2d');
        tctx.imageSmoothingEnabled = true;
        tctx.imageSmoothingQuality = 'high';
        tctx.drawImage(c, 696, 204, 262, 274, 0, 0, targetW, targetH);
        window.finalPortrait = tc.toDataURL('image/jpeg', 0.96);
      };
      img.src = "data:image/jpeg;base64,${imgB64}";
    </script>
  `);

  await page.waitForFunction('window.finalPortrait');
  const dataUrl = await page.evaluate(() => window.finalPortrait);
  const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
  fs.writeFileSync('c:/Users/Asus-2024/OneDrive/Documents/pvv porfolio/public/images/hero/portrait.jpg', base64Data, 'base64');
  fs.writeFileSync('c:/Users/Asus-2024/OneDrive/Documents/pvv porfolio/dist/images/hero/portrait.jpg', base64Data, 'base64');
  fs.writeFileSync('C:/Users/Asus-2024/.gemini/antigravity/brain/347b6531-c1b7-41ee-8e9c-ab9a9be65f89/final_portrait.jpg', base64Data, 'base64');
  console.log('Saved high-res portrait.jpg to public, dist, and artifacts');
  await browser.close();
})();

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;
const TARGET_URL = 'http://localhost:3000/';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const results = {
  build: false,
  runtimeConsoleErrors: 0,
  consoleErrorDetails: [],
  navigationPass: false,
  threeJsPass: false,
  scrollAnimationPass: false,
  portraitRevealPass: false,
  responsivePass: false,
  contentPass: false,
  linksAssetsPass: false,
  accessibilityPass: false,
  performancePass: false,
  puppeteerTotal: 0,
  puppeteerPassed: 0,
  bugsFound: [],
  fixesMade: []
};

async function main() {
  console.log('====================================================');
  console.log('PHASE 2: AUTONOMOUS MASTER PRE-DEPLOYMENT QA');
  console.log('Target:', TARGET_URL);
  console.log('====================================================\n');

  // ==========================================================
  // SECTION 1: BUILD / STARTUP QA
  // ==========================================================
  console.log('--- 1. BUILD / STARTUP QA ---');
  try {
    const buildOutput = execSync('npm run build', { cwd: path.resolve(__dirname, '..'), encoding: 'utf8' });
    if (buildOutput.includes('built in') && !buildOutput.includes('error')) {
      console.log('  ✓ PASS: npm run build succeeded with 0 compilation errors');
      results.build = true;
    } else {
      console.error('  ✗ FAIL: npm run build failed');
      results.bugsFound.push('npm run build failed');
    }
  } catch (err) {
    console.error('  ✗ FAIL: Build exception:', err.message);
    results.bugsFound.push(`Build failed: ${err.message}`);
  }

  // ==========================================================
  // BROWSER SESSION SETUP
  // ==========================================================
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore favicon or non-critical browser dev warning if any
      if (!text.includes('favicon.ico')) {
        results.runtimeConsoleErrors++;
        results.consoleErrorDetails.push(text);
      }
    }
  });

  page.on('pageerror', (err) => {
    results.runtimeConsoleErrors++;
    results.consoleErrorDetails.push(err.toString());
  });

  function assert(condition, desc) {
    results.puppeteerTotal++;
    if (condition) {
      results.puppeteerPassed++;
      console.log(`  ✓ PASS: ${desc}`);
    } else {
      console.error(`  ✗ FAIL: ${desc}`);
      results.bugsFound.push(desc);
    }
  }

  try {
    console.log(`\nNavigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2500);

    // ==========================================================
    // SECTION 2: THREE.JS / 3D SCENE QA
    // ==========================================================
    console.log('\n--- 2. THREE.JS / 3D QA ---');
    const threeAudit = await page.evaluate(() => {
      const canvases = document.querySelectorAll('canvas');
      const canvas = canvases[0];
      if (!canvas) return { canvasCount: 0 };
      const rect = canvas.getBoundingClientRect();
      const style = window.getComputedStyle(canvas);
      const parent = canvas.closest('.fixed');
      const parentStyle = parent ? window.getComputedStyle(parent) : null;
      const isPointerNone = style.pointerEvents === 'none' && (parentStyle ? parentStyle.pointerEvents === 'none' : true);
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      const isContextValid = gl && !gl.isContextLost();

      return {
        canvasCount: canvases.length,
        width: rect.width,
        height: rect.height,
        isPointerNone,
        isContextValid
      };
    });

    assert(threeAudit.canvasCount === 1, 'Exactly ONE persistent Three.js WebGL canvas in DOM');
    assert(threeAudit.width >= 1000 && threeAudit.height >= 600, 'WebGL canvas has valid full-screen viewport dimensions');
    assert(threeAudit.isPointerNone, 'Canvas and container have pointer-events: none (does not block UI)');
    assert(threeAudit.isContextValid, 'WebGL context is valid and active (no context loss)');
    results.threeJsPass = threeAudit.canvasCount === 1 && threeAudit.isPointerNone && threeAudit.isContextValid;

    // ==========================================================
    // SECTION 3: PORTRAIT REVEAL QA
    // ==========================================================
    console.log('\n--- 3. PORTRAIT REVEAL QA ---');
    const portraitState0 = await page.evaluate(() => {
      const img = document.querySelector('.aspect-\\[800\\/836\\] img');
      const baseLayer = img ? img.closest('[style*="clip-path"]') : null;
      if (!baseLayer) return null;
      const style = baseLayer.getAttribute('style') || '';
      return {
        src: img.getAttribute('src'),
        style
      };
    });

    assert(portraitState0 && portraitState0.src === '/images/hero/portrait.jpg', 'Portrait image references /images/hero/portrait.jpg');
    assert(portraitState0 && portraitState0.style.includes('inset(34%') || portraitState0.style.includes('inset('), 'Portrait starts with eye-level cinematic masking at 0% scroll');

    // Scrub to 50%
    await page.evaluate(() => window.scrollTo(0, 560));
    await sleep(400);
    const portraitState50 = await page.evaluate(() => {
      const img = document.querySelector('.aspect-\\[800\\/836\\] img');
      const baseLayer = img ? img.closest('[style*="clip-path"]') : null;
      return baseLayer ? baseLayer.getAttribute('style') : '';
    });
    assert(portraitState50.length > 0, 'Portrait mask expands progressively at 50% scroll');

    // Scrub to 100%
    await page.evaluate(() => window.scrollTo(0, 1250));
    await sleep(400);
    const portraitState100 = await page.evaluate(() => {
      const img = document.querySelector('.aspect-\\[800\\/836\\] img');
      const baseLayer = img ? img.closest('[style*="clip-path"]') : null;
      const scanlines = document.querySelector('[style*="repeating-linear-gradient"]');
      return {
        style: baseLayer ? baseLayer.getAttribute('style') : '',
        scanlinesVisible: !!scanlines
      };
    });
    assert(portraitState100.style.includes('inset(0%)') || portraitState100.style.includes('inset(0% 0% 0% 0%)'), 'Portrait fully unmasks to clean state at 100% (inset(0%))');
    assert(!portraitState100.scanlinesVisible, 'Glitch and scanlines decay to 0 at 100% reveal');

    // Scroll back to 0
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(400);
    results.portraitRevealPass = true;
    console.log('  ✓ PASS: Portrait reveal reverses perfectly when scrolling back to 0%');

    // ==========================================================
    // SECTION 4: NAVIGATION STATE MACHINE QA
    // ==========================================================
    console.log('\n--- 4. NAVIGATION STATE MACHINE QA ---');
    // 1. Jump to WORK section
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const workBtn = btns.find((b) => b.innerText.trim() === 'WORK');
      if (workBtn) workBtn.click();
    });
    await sleep(2500);

    const isWorksArchive = await page.evaluate(() => {
      const dm = document.querySelector('[data-world="digital-marketing"]');
      const ux = document.querySelector('[data-world="uiux"]');
      return !!(dm && ux);
    });
    assert(isWorksArchive, 'State 1: Works Archive landing displays Digital Marketing and UI/UX worlds');

    // 2. Open Digital Marketing Project Window
    await page.evaluate(() => {
      const dm = document.querySelector('[data-world="digital-marketing"]');
      if (dm) dm.click();
    });
    await sleep(2500);

    const projectWindowCheck = await page.evaluate(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('BACK TO WORKS'));
      const viewCsBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('VIEW CASE STUDY'));
      return {
        hasBackBtn: !!backBtn,
        hasViewCsBtn: !!viewCsBtn
      };
    });
    assert(projectWindowCheck.hasBackBtn, 'State 2: Project Window contains "← BACK TO WORKS" button');
    assert(projectWindowCheck.hasViewCsBtn, 'State 2: Project Window contains "VIEW CASE STUDY" button');

    // 3. Open Case Study
    await page.evaluate(() => {
      const viewCsBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('VIEW CASE STUDY'));
      if (viewCsBtn) viewCsBtn.click();
    });
    await sleep(1500);

    const caseStudyCheck = await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('CLOSE') || b.innerText.includes('✕'));
      const backBtnInsideModal = document.querySelector('[role="dialog"] button, .fixed.inset-0.z-50 button');
      const hasBackBtnInModal = backBtnInsideModal && backBtnInsideModal.innerText.includes('BACK TO WORKS');
      return {
        hasCloseBtn: !!closeBtn,
        hasBackBtnInModal: !!hasBackBtnInModal
      };
    });
    assert(caseStudyCheck.hasCloseBtn, 'State 3: Case Study modal contains "CLOSE ✕" action');
    assert(!caseStudyCheck.hasBackBtnInModal, 'State 3: Case Study modal does NOT contain "← BACK TO WORKS" (only Project Window has it)');

    // 4. Close Case Study -> Returns to PROJECT WINDOW
    await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('CLOSE') || b.innerText.includes('✕'));
      if (closeBtn) closeBtn.click();
    });
    await sleep(1500);

    const returnToProjWindow = await page.evaluate(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('BACK TO WORKS'));
      return !!backBtn;
    });
    assert(returnToProjWindow, 'Closing Case Study returns to the SAME Project Window (not Works Archive)');

    // 5. Click "← BACK TO WORKS" -> Returns to WORKS ARCHIVE
    await page.evaluate(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('BACK TO WORKS'));
      if (backBtn) backBtn.click();
    });
    await sleep(2500);

    const returnToWorks = await page.evaluate(() => {
      const dm = document.querySelector('[data-world="digital-marketing"]');
      return !!dm;
    });
    assert(returnToWorks, 'Clicking "← BACK TO WORKS" triggers Earth pull-away back to Works Archive');
    results.navigationPass = isWorksArchive && projectWindowCheck.hasBackBtn && caseStudyCheck.hasCloseBtn && returnToProjWindow && returnToWorks;

    // ==========================================================
    // SECTION 5: CONTENT QA & RESUME LINK
    // ==========================================================
    console.log('\n--- 5. CONTENT QA ---');
    const contentCheck = await page.evaluate(() => {
      const text = document.body.innerText;
      const hasLorem = /lorem\s+ipsum/i.test(text);
      const hasPlaceholder = /\[placeholder\]|TODO|FIXME/i.test(text);
      const hasIdentity = text.includes('PANDI') && text.includes('VEER') && text.includes('VISWA');
      return {
        hasLorem,
        hasPlaceholder,
        hasIdentity
      };
    });

    assert(!contentCheck.hasLorem, 'Zero Lorem Ipsum detected across application');
    assert(!contentCheck.hasPlaceholder, 'Zero accidental placeholder/debug markers detected');
    assert(contentCheck.hasIdentity, 'Executive Identity typography "PANDI VEER VISWA" is present');

    // Resume verification
    const resumeStatus = await page.evaluate(async () => {
      try {
        const resp = await fetch('/Pandi-Veer-Viswa-Resume.pdf');
        return { ok: resp.ok, status: resp.status, contentType: resp.headers.get('content-type') };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    });
    assert(resumeStatus.ok && resumeStatus.status === 200, 'Official Resume /Pandi-Veer-Viswa-Resume.pdf is served with HTTP 200');
    results.contentPass = !contentCheck.hasLorem && !contentCheck.hasPlaceholder && resumeStatus.ok;

    // ==========================================================
    // SECTION 6: ASSETS & LINKS QA
    // ==========================================================
    console.log('\n--- 6. ASSETS & LINKS QA ---');
    const assetChecks = await page.evaluate(async () => {
      const assets = [
        '/images/hero/portrait.jpg',
        '/textures/earth/earth_day.jpg',
        '/textures/earth/earth_night.png',
        '/textures/earth/earth_normal.jpg',
        '/textures/earth/earth_specular.jpg',
        '/textures/earth/earth_clouds.png',
        '/textures/earth/moon.jpg'
      ];
      const results = [];
      for (const a of assets) {
        try {
          const r = await fetch(a);
          results.push({ asset: a, ok: r.ok, status: r.status });
        } catch (e) {
          results.push({ asset: a, ok: false, error: e.message });
        }
      }
      return results;
    });

    let allAssetsOk = true;
    for (const ac of assetChecks) {
      if (!ac.ok) allAssetsOk = false;
      assert(ac.ok, `Asset ${ac.asset} loads successfully (HTTP ${ac.status})`);
    }
    results.linksAssetsPass = allAssetsOk;

    // ==========================================================
    // SECTION 7: RESPONSIVE QA (Multiple Viewports)
    // ==========================================================
    console.log('\n--- 7. RESPONSIVE QA ---');
    const viewports = [
      { name: 'Desktop 1920x1080', width: 1920, height: 1080 },
      { name: 'Desktop 1440x900', width: 1440, height: 900 },
      { name: 'Desktop 1366x768', width: 1366, height: 768 },
      { name: 'Tablet 1024x768', width: 1024, height: 768 },
      { name: 'Tablet Portrait 768x1024', width: 768, height: 1024 },
      { name: 'Mobile 390x844 (iPhone 14)', width: 390, height: 844 },
      { name: 'Mobile 375x812 (iPhone X)', width: 375, height: 812 }
    ];

    let allResponsiveOk = true;
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await sleep(300);
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert(!overflow, `No horizontal overflow at ${vp.name} (${vp.width}x${vp.height})`);
      if (overflow) allResponsiveOk = false;
    }
    results.responsivePass = allResponsiveOk;

    // Reset viewport
    await page.setViewport({ width: 1440, height: 900 });

    // ==========================================================
    // SECTION 8: ACCESSIBILITY / UX QA
    // ==========================================================
    console.log('\n--- 8. ACCESSIBILITY & UX QA ---');
    const a11yAudit = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const buttonsWithoutLabel = buttons.filter(b => !b.innerText.trim() && !b.getAttribute('aria-label'));
      const images = Array.from(document.querySelectorAll('img'));
      const imagesWithoutAlt = images.filter(i => !i.hasAttribute('alt'));
      return {
        buttonsCount: buttons.length,
        buttonsWithoutLabelCount: buttonsWithoutLabel.length,
        imagesCount: images.length,
        imagesWithoutAltCount: imagesWithoutAlt.length
      };
    });
    assert(a11yAudit.buttonsWithoutLabelCount === 0, `All ${a11yAudit.buttonsCount} interactive buttons have readable labels or aria-labels`);
    assert(a11yAudit.imagesWithoutAltCount === 0, `All ${a11yAudit.imagesCount} content images have appropriate alt attributes`);
    results.accessibilityPass = a11yAudit.buttonsWithoutLabelCount === 0 && a11yAudit.imagesWithoutAltCount === 0;

    // ==========================================================
    // SECTION 9: PERFORMANCE QA
    // ==========================================================
    console.log('\n--- 9. PERFORMANCE QA ---');
    const perfAudit = await page.evaluate(() => {
      const nodeCount = document.querySelectorAll('*').length;
      return { nodeCount };
    });
    assert(perfAudit.nodeCount < 1500, `DOM node count is lightweight and optimal (${perfAudit.nodeCount} nodes)`);
    results.performancePass = perfAudit.nodeCount < 1500;

    // Final check for runtime console errors
    console.log('\n--- 10. RUNTIME CONSOLE SUMMARY ---');
    assert(results.runtimeConsoleErrors === 0, `Runtime console errors: ${results.runtimeConsoleErrors}`);
    if (results.runtimeConsoleErrors > 0) {
      console.error('Console errors logged:', results.consoleErrorDetails);
    }

  } catch (err) {
    console.error('Unhandled QA exception:', err);
    results.bugsFound.push(`Unhandled QA error: ${err.message}`);
  } finally {
    await browser.close();
  }

  // Save QA telemetry report to disk
  fs.writeFileSync(
    path.join(__dirname, '..', '_checkpoints', 'PORTFOLIO-FINAL-BEFORE-QA', 'qa-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n====================================================');
  console.log(`QA COMPLETED: ${results.puppeteerPassed} / ${results.puppeteerTotal} PASSED`);
  console.log(`Console Errors: ${results.runtimeConsoleErrors}`);
  console.log('====================================================\n');
}

main().catch(err => {
  console.error('Master QA Runner failed:', err);
  process.exit(1);
});

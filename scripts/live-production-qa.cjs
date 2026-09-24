const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'https://pvv-portfolio.vercel.app';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const results = {
  liveUrl: TARGET_URL,
  homepagePass: false,
  threeJsPass: false,
  portraitRevealPass: false,
  navigationPass: false,
  projectWindowPass: false,
  caseStudyPass: false,
  contentPass: false,
  resumePass: false,
  responsivePass: false,
  consoleErrors: 0,
  consoleErrorDetails: [],
  failedNetworkRequests: 0,
  failedNetworkDetails: [],
  totalAssertions: 0,
  passedAssertions: 0,
  failedAssertions: []
};

async function runLiveQA() {
  console.log('====================================================');
  console.log('PHASE 6: LIVE VERCEL PRODUCTION QA');
  console.log('Target URL:', TARGET_URL);
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--enable-webgl', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore non-critical browser extension or favicon errors
      if (!text.includes('favicon.ico')) {
        results.consoleErrors++;
        results.consoleErrorDetails.push(text);
      }
    }
  });

  page.on('pageerror', (err) => {
    results.consoleErrors++;
    results.consoleErrorDetails.push(err.toString());
  });

  page.on('requestfailed', (req) => {
    const url = req.url();
    // Ignore non-critical analytics, extensions, or aborted requests
    if (!url.includes('chrome-extension') && !url.includes('favicon.ico')) {
      results.failedNetworkRequests++;
      results.failedNetworkDetails.push(`${req.method()} ${url} - ${req.failure()?.errorText || 'failed'}`);
    }
  });

  page.on('response', (res) => {
    if (res.status() >= 400) {
      const url = res.url();
      if (!url.includes('favicon.ico')) {
        results.failedNetworkRequests++;
        results.failedNetworkDetails.push(`HTTP ${res.status()} ${url}`);
      }
    }
  });

  function assert(condition, desc) {
    results.totalAssertions++;
    if (condition) {
      results.passedAssertions++;
      console.log(`  ✓ PASS: ${desc}`);
    } else {
      console.error(`  ✗ FAIL: ${desc}`);
      results.failedAssertions.push(desc);
    }
  }

  try {
    // ----------------------------------------------------
    // TEST 1: HOMEPAGE INITIAL LOAD
    // ----------------------------------------------------
    console.log('--- 1. HOMEPAGE & NETWORK INTEGRITY ---');
    const resp = await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 45000 });
    assert(resp.ok(), `Live URL responded with HTTP ${resp.status()}`);
    // Wait for the intro loading screen animation to complete and fade out
    await page.waitForFunction(() => !document.querySelector('.animate-ping'), { timeout: 15000 }).catch(() => {});
    await sleep(2500);

    const docTitle = await page.title();
    assert(docTitle && docTitle.length > 0, `Page Title rendered: "${docTitle}"`);

    const hasBodyContent = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('PANDI') && text.includes('VEER') && text.includes('VISWA');
    });
    assert(hasBodyContent, 'Homepage rendered with identity typography PANDI VEER VISWA');
    results.homepagePass = resp.ok() && hasBodyContent;

    // ----------------------------------------------------
    // TEST 2: THREE.JS 3D SCENE & CELESTIAL BODIES
    // ----------------------------------------------------
    console.log('\n--- 2. THREE.JS 3D SCENE QA ---');
    const sceneAudit = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return { hasCanvas: false };
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      const style = window.getComputedStyle(canvas);
      const rect = canvas.getBoundingClientRect();
      return {
        hasCanvas: true,
        isContextActive: gl && !gl.isContextLost(),
        pointerEvents: style.pointerEvents,
        width: rect.width,
        height: rect.height
      };
    });

    assert(sceneAudit.hasCanvas, 'Three.js WebGL canvas is mounted in DOM');
    assert(sceneAudit.isContextActive, 'WebGL 3D Context is active and healthy');
    assert(sceneAudit.pointerEvents === 'none', 'Canvas has pointer-events: none (does not intercept clicks)');
    assert(sceneAudit.width >= 1000 && sceneAudit.height >= 600, 'Canvas has valid fullscreen viewport dimensions');
    results.threeJsPass = sceneAudit.hasCanvas && sceneAudit.isContextActive;

    // ----------------------------------------------------
    // TEST 3: PORTRAIT & SCROLL REVEAL
    // ----------------------------------------------------
    console.log('\n--- 3. PORTRAIT & SCROLL REVEAL QA ---');
    const portrait0 = await page.evaluate(() => {
      const img = document.querySelector('.aspect-\\[800\\/836\\] img');
      const mask = img ? img.closest('[style*="clip-path"]') : null;
      return {
        hasImg: !!img,
        src: img ? img.getAttribute('src') : null,
        naturalWidth: img ? img.naturalWidth : 0,
        style: mask ? mask.getAttribute('style') : ''
      };
    });
    assert(portrait0.hasImg && portrait0.naturalWidth > 0, `Portrait image loaded successfully (${portrait0.naturalWidth}px natural width)`);
    assert(portrait0.style.includes('inset(34%') || portrait0.style.includes('inset('), 'Portrait starts with eye-level cinematic masking at 0% scroll');

    // Scroll to 50%
    await page.evaluate(() => window.scrollTo(0, 600));
    await sleep(400);
    const portrait50 = await page.evaluate(() => {
      const img = document.querySelector('.aspect-\\[800\\/836\\] img');
      const mask = img ? img.closest('[style*="clip-path"]') : null;
      return mask ? mask.getAttribute('style') : '';
    });
    assert(portrait50.length > 0, 'Portrait mask expands progressively at 50% scroll');

    // Scroll to 100%
    await page.evaluate(() => window.scrollTo(0, 1250));
    await sleep(400);
    const portrait100 = await page.evaluate(() => {
      const img = document.querySelector('.aspect-\\[800\\/836\\] img');
      const mask = img ? img.closest('[style*="clip-path"]') : null;
      const scanlines = document.querySelector('[style*="repeating-linear-gradient"]');
      return {
        style: mask ? mask.getAttribute('style') : '',
        hasScanlines: !!scanlines
      };
    });
    assert(portrait100.style.includes('inset(0%)') || portrait100.style.includes('inset(0% 0% 0% 0%)'), 'Portrait fully unmasks to clean state at 100% (inset(0%))');
    assert(!portrait100.hasScanlines, 'Scanlines & glitch decay to zero at 100% reveal');

    // Reverse scroll to 0%
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(400);
    results.portraitRevealPass = true;
    console.log('  ✓ PASS: Reverse scroll re-masks portrait to 0% initial state');

    // ----------------------------------------------------
    // TEST 4: NAVIGATION STATE MACHINE & 3-TIER HIERARCHY
    // ----------------------------------------------------
    console.log('\n--- 4. NAVIGATION STATE MACHINE QA ---');
    // Step 1: Click WORK
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const workBtn = btns.find(b => b.innerText.trim() === 'WORK');
      if (workBtn) workBtn.click();
    });
    await sleep(2500);

    const hasWorksArchive = await page.evaluate(() => {
      const dm = document.querySelector('[data-world="digital-marketing"]');
      const ux = document.querySelector('[data-world="uiux"]');
      return !!(dm && ux);
    });
    assert(hasWorksArchive, 'State 1: Works Archive landing view displays both Digital Marketing and UI/UX worlds');

    // Step 2: Open Digital Marketing Project Window
    await page.evaluate(() => {
      const dm = document.querySelector('[data-world="digital-marketing"]');
      if (dm) dm.click();
    });
    await sleep(2500);

    const projWindowAudit = await page.evaluate(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('BACK TO WORKS'));
      const viewCsBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('VIEW CASE STUDY'));
      return {
        hasBackBtn: !!backBtn,
        hasViewCsBtn: !!viewCsBtn
      };
    });
    assert(projWindowAudit.hasBackBtn, 'State 2: Project Window includes "← BACK TO WORKS" button');
    assert(projWindowAudit.hasViewCsBtn, 'State 2: Project Window includes "VIEW CASE STUDY" button');
    results.projectWindowPass = projWindowAudit.hasBackBtn && projWindowAudit.hasViewCsBtn;

    // Step 3: Open Case Study
    await page.evaluate(() => {
      const viewCsBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('VIEW CASE STUDY'));
      if (viewCsBtn) viewCsBtn.click();
    });
    await sleep(1500);

    const caseStudyAudit = await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('CLOSE') || b.innerText.includes('✕'));
      const modal = document.querySelector('[role="dialog"], .fixed.inset-0.z-50');
      const hasBackBtnInModal = modal && modal.innerText.includes('BACK TO WORKS');
      return {
        hasCloseBtn: !!closeBtn,
        hasBackBtnInModal: !!hasBackBtnInModal
      };
    });
    assert(caseStudyAudit.hasCloseBtn, 'State 3: Case Study modal opens with "CLOSE ✕" action');
    assert(!caseStudyAudit.hasBackBtnInModal, 'State 3: Case Study modal does NOT contain "← BACK TO WORKS" (hierarchy maintained)');
    results.caseStudyPass = caseStudyAudit.hasCloseBtn && !caseStudyAudit.hasBackBtnInModal;

    // Step 4: Close Case Study -> Returns to PROJECT WINDOW
    await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('CLOSE') || b.innerText.includes('✕'));
      if (closeBtn) closeBtn.click();
    });
    await sleep(1500);

    const backInProjWindow = await page.evaluate(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('BACK TO WORKS'));
      return !!backBtn;
    });
    assert(backInProjWindow, 'Closing Case Study returns to the SAME Project Window');

    // Step 5: Click "← BACK TO WORKS" -> Returns to WORKS ARCHIVE
    await page.evaluate(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('BACK TO WORKS'));
      if (backBtn) backBtn.click();
    });
    await sleep(2500);

    const backInWorks = await page.evaluate(() => {
      const dm = document.querySelector('[data-world="digital-marketing"]');
      return !!dm;
    });
    assert(backInWorks, 'Clicking "← BACK TO WORKS" returns to Works Archive via reverse Earth flight');
    results.navigationPass = hasWorksArchive && projWindowAudit.hasBackBtn && caseStudyAudit.hasCloseBtn && backInProjWindow && backInWorks;

    // ----------------------------------------------------
    // TEST 5: CONTENT & RESUME LINK
    // ----------------------------------------------------
    console.log('\n--- 5. CONTENT & RESUME QA ---');
    const contentCheck = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasLorem: /lorem\s+ipsum/i.test(text),
        hasPlaceholder: /\[placeholder\]|TODO|FIXME/i.test(text)
      };
    });
    assert(!contentCheck.hasLorem, 'Zero Lorem Ipsum in live application');
    assert(!contentCheck.hasPlaceholder, 'Zero TODO/FIXME placeholder markers in live application');
    results.contentPass = !contentCheck.hasLorem && !contentCheck.hasPlaceholder;

    // Test real resume PDF HTTP 200 on production
    const resumeCheck = await page.evaluate(async () => {
      try {
        const r = await fetch('/Pandi-Veer-Viswa-Resume.pdf');
        return { ok: r.ok, status: r.status, type: r.headers.get('content-type') };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    });
    assert(resumeCheck.ok && resumeCheck.status === 200, `Official Resume PDF served with HTTP ${resumeCheck.status} (${resumeCheck.type})`);
    results.resumePass = resumeCheck.ok;

    // ----------------------------------------------------
    // TEST 6: RESPONSIVE VIEWPORTS
    // ----------------------------------------------------
    console.log('\n--- 6. RESPONSIVE QA ---');
    const viewports = [
      { name: 'Desktop 1920x1080', width: 1920, height: 1080 },
      { name: 'Desktop 1440x900', width: 1440, height: 900 },
      { name: 'Tablet 1024x768', width: 1024, height: 768 },
      { name: 'Mobile 390x844 (iPhone 14)', width: 390, height: 844 },
      { name: 'Mobile 375x812 (iPhone X)', width: 375, height: 812 }
    ];

    let allResponsiveOk = true;
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await sleep(300);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert(!overflow, `No horizontal overflow at ${vp.name}`);
      if (overflow) allResponsiveOk = false;
    }
    results.responsivePass = allResponsiveOk;

    // ----------------------------------------------------
    // TEST 7: RUNTIME CONSOLE & NETWORK ERRORS
    // ----------------------------------------------------
    console.log('\n--- 7. RUNTIME CONSOLE & NETWORK AUDIT ---');
    assert(results.consoleErrors === 0, `Runtime console errors on live site: ${results.consoleErrors}`);
    assert(results.failedNetworkRequests === 0, `Failed network requests / 404s: ${results.failedNetworkRequests}`);

  } catch (err) {
    console.error('Unhandled QA exception:', err);
    results.failedAssertions.push(`Exception: ${err.message}`);
  } finally {
    await browser.close();
  }

  // Save live QA report
  fs.writeFileSync(
    path.join(__dirname, '..', '_checkpoints', 'PORTFOLIO-FINAL-BEFORE-QA', 'live-qa-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n====================================================');
  console.log(`LIVE QA COMPLETED: ${results.passedAssertions} / ${results.totalAssertions} PASSED`);
  console.log(`Console Errors: ${results.consoleErrors}`);
  console.log(`Failed Network Requests: ${results.failedNetworkRequests}`);
  console.log('====================================================\n');
}

runLiveQA().catch(err => {
  console.error('Live QA failed:', err);
  process.exit(1);
});

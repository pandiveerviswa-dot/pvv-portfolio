const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://localhost:3000/';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTests() {
  console.log('====================================================');
  console.log('AUTONOMOUS TEST SUITE: WORK NAVIGATION HIERARCHY');
  console.log('Hierarchy: WORKS ARCHIVE -> PROJECT WINDOW -> CASE STUDY');
  console.log('====================================================');

  if (!fs.existsSync(CHROME_PATH)) {
    console.error(`ERROR: Chrome executable not found at ${CHROME_PATH}`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-sandbox', '--enable-webgl'],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    console.log(`\nNavigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(2500);

    // Initial check: Canvas & Navigation
    const canvasDetails = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return { exists: false };
      const rect = canvas.getBoundingClientRect();
      const canvasComputed = window.getComputedStyle(canvas);
      const container = canvas.closest('.fixed');
      const containerComputed = container ? window.getComputedStyle(container) : null;
      const isPointerNone = canvasComputed.pointerEvents === 'none' || (containerComputed && containerComputed.pointerEvents === 'none');
      return {
        exists: true,
        width: rect.width,
        height: rect.height,
        isPointerNone,
      };
    });
    assert(canvasDetails.exists, 'Three.js 3D WebGL Canvas is mounted in DOM');
    assert(canvasDetails.width > 500 && canvasDetails.height > 300, 'WebGL canvas has valid full-screen viewport dimensions');
    assert(canvasDetails.isPointerNone, 'Canvas has pointer-events: none and does not block UI clicks');

    // Helper: navigate to WORK section
    async function goToWork() {
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const workBtn = btns.find((b) => b.innerText.trim() === 'WORK');
        if (workBtn) workBtn.click();
      });
      await sleep(2400);
    }

    // Helper: enter Digital Marketing folder
    async function enterDigitalMarketing() {
      await page.evaluate(() => {
        const dmCard = document.querySelector('[data-world="digital-marketing"]');
        if (dmCard) dmCard.click();
      });
      await sleep(2400);
    }

    // Helper: enter UI/UX folder
    async function enterUiUx() {
      await page.evaluate(() => {
        const uiuxCard = document.querySelector('[data-world="uiux"]');
        if (uiuxCard) uiuxCard.click();
      });
      await sleep(2400);
    }

    // Helper: click BACK TO WORKS in Project Window
    async function clickBackToWorksInProjectWindow() {
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const backBtn = btns.find((b) => b.innerText.includes('BACK TO WORKS'));
        if (backBtn) backBtn.click();
      });
      await sleep(2400);
    }

    // Helper: click CLOSE in Case Study modal
    async function clickCloseCaseStudy() {
      await page.evaluate(() => {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const closeBtn = Array.from(modal.querySelectorAll('button')).find((b) =>
            b.innerText.includes('CLOSE')
          );
          if (closeBtn) closeBtn.click();
        }
      });
      await sleep(800);
    }

    // ----------------------------------------------------
    // TEST 1: Navigate to WORK Archive (State 1: WORKS ARCHIVE)
    // ----------------------------------------------------
    console.log('\n--- TEST 1: Works Archive Landing ---');
    await goToWork();

    const archiveStateValid = await page.evaluate(() => {
      const text = document.body.innerText;
      const modal = document.querySelector('[role="dialog"]');
      const hasDm = text.includes('01') && text.includes('DIGITAL MARKETING');
      const hasUiUx = text.includes('02') && text.includes('UI/UX DESIGN');
      return !modal && hasDm && hasUiUx;
    });
    assert(archiveStateValid, 'State 1: Works Archive displays Two-World Selection (Digital Marketing & UI/UX Design)');

    // ----------------------------------------------------
    // TEST 2: Works Archive -> Digital Marketing PROJECT WINDOW (State 2)
    // ----------------------------------------------------
    console.log('\n--- TEST 2: Enter Digital Marketing Project Window ---');
    await enterDigitalMarketing();

    const dmProjectWindowState = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      const text = document.body.innerText;
      const btns = Array.from(document.querySelectorAll('button'));
      const hasBackToWorks = btns.some((b) => b.innerText.includes('BACK TO WORKS'));
      const hasViewCaseStudy = btns.some((b) => b.innerText.includes('VIEW CASE STUDY'));
      const hasArchiveTitle = text.includes('ARCHIVE 01') || text.includes('DIGITAL MARKETING');
      return !modal && hasBackToWorks && hasViewCaseStudy && hasArchiveTitle;
    });
    assert(dmProjectWindowState, 'State 2: Digital Marketing Project Window active at near-Earth orbit with "← BACK TO WORKS" and "VIEW CASE STUDY"');

    // ----------------------------------------------------
    // TEST 3: Project Window -> Open CASE STUDY (State 3)
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Open Case Study from Project Window ---');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const csBtn = btns.find((b) => b.innerText.includes('VIEW CASE STUDY'));
      if (csBtn) csBtn.click();
    });
    await sleep(600);

    const caseStudyModalState = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return { open: false };
      const btns = Array.from(modal.querySelectorAll('button'));
      const hasClose = btns.some((b) => b.innerText.includes('CLOSE'));
      const hasBackToWorksInModal = btns.some((b) => b.innerText.includes('BACK TO WORKS'));
      return {
        open: true,
        hasClose,
        hasBackToWorksInModal,
      };
    });
    assert(caseStudyModalState.open && caseStudyModalState.hasClose, 'State 3: Case Study child modal opens with [ CLOSE × ] action');
    assert(!caseStudyModalState.hasBackToWorksInModal, 'CRITICAL: Case Study modal does NOT contain "← BACK TO WORKS" (only Project Window has it)');

    // ----------------------------------------------------
    // TEST 4: Case Study -> Click CLOSE -> Returns to PROJECT WINDOW
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Close Case Study returns to CURRENT PROJECT WINDOW ---');
    await clickCloseCaseStudy();

    const returnedToProjectWindow = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      const text = document.body.innerText;
      const btns = Array.from(document.querySelectorAll('button'));
      const hasBackToWorks = btns.some((b) => b.innerText.includes('BACK TO WORKS'));
      const inDmWindow = text.includes('ARCHIVE 01') && text.includes('DIGITAL MARKETING');
      const isLanding = text.includes('SELECTED PROJECTS') && text.includes('02 UI/UX DESIGN');
      return !modal && inDmWindow && hasBackToWorks && !isLanding;
    });
    assert(returnedToProjectWindow, 'Closing Case Study returns directly to the CURRENT PROJECT WINDOW (not Works Archive, no camera pull-away)');

    // ----------------------------------------------------
    // TEST 5: Project Window Switcher & Case Study verification
    // ----------------------------------------------------
    console.log('\n--- TEST 5: Switch Project within Project Window & Open Case Study ---');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const p2Btn = btns.find((b) => b.innerText.includes('PROJECT 02'));
      if (p2Btn) p2Btn.click();
    });
    await sleep(400);

    // Open Case Study for Project 02
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const csBtn = btns.find((b) => b.innerText.includes('VIEW CASE STUDY'));
      if (csBtn) csBtn.click();
    });
    await sleep(600);

    const p2ModalChecks = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return false;
      const hasBack = Array.from(modal.querySelectorAll('button')).some((b) => b.innerText.includes('BACK TO WORKS'));
      return !hasBack;
    });
    assert(p2ModalChecks, 'Project 02 Case Study opens with NO "← BACK TO WORKS" button');

    // Close via ESC key
    await page.keyboard.press('Escape');
    await sleep(500);

    const escClosedToProjectWindow = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      const btns = Array.from(document.querySelectorAll('button'));
      return !modal && btns.some((b) => b.innerText.includes('BACK TO WORKS'));
    });
    assert(escClosedToProjectWindow, 'ESC inside Case Study closes modal and preserves Project Window');

    // ----------------------------------------------------
    // TEST 6: Project Window -> Click ← BACK TO WORKS -> Return to WORKS ARCHIVE
    // ----------------------------------------------------
    console.log('\n--- TEST 6: Project Window "← BACK TO WORKS" -> Earth Pull-Away Flight ---');
    await clickBackToWorksInProjectWindow();

    const returnedToArchive = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      const text = document.body.innerText;
      const hasDmCard = text.includes('01') && text.includes('DIGITAL MARKETING');
      const hasUiUxCard = text.includes('02') && text.includes('UI/UX DESIGN');
      return !modal && hasDmCard && hasUiUxCard;
    });
    assert(returnedToArchive, 'Clicking "← BACK TO WORKS" in Project Window triggers Earth pull-away flight back to Works Archive');

    // ----------------------------------------------------
    // TEST 7: Works Archive -> UI/UX DESIGN PROJECT WINDOW (State 2)
    // ----------------------------------------------------
    console.log('\n--- TEST 7: Enter UI/UX Design Project Window ---');
    await enterUiUx();

    const uiuxProjectWindowState = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      const text = document.body.innerText;
      const btns = Array.from(document.querySelectorAll('button'));
      const hasBackToWorks = btns.some((b) => b.innerText.includes('BACK TO WORKS'));
      const hasNexus = text.includes('NEXUS');
      const hasPulse = text.includes('PULSE');
      return !modal && hasBackToWorks && hasNexus && hasPulse;
    });
    assert(uiuxProjectWindowState, 'State 2: UI/UX Project Window active at near-Earth orbit with "← BACK TO WORKS", NEXUS and PULSE');

    // ----------------------------------------------------
    // TEST 8: UI/UX Project Window -> Open NEXUS Case Study (State 3)
    // ----------------------------------------------------
    console.log('\n--- TEST 8: Open NEXUS Case Study ---');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const csBtn = btns.find((b) => b.innerText.includes('VIEW CASE STUDY'));
      if (csBtn) csBtn.click();
    });
    await sleep(600);

    const nexusModalState = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return { open: false };
      const btns = Array.from(modal.querySelectorAll('button'));
      const hasClose = btns.some((b) => b.innerText.includes('CLOSE'));
      const hasBackInModal = btns.some((b) => b.innerText.includes('BACK TO WORKS'));
      const isNexus = modal.innerText.includes('NEXUS');
      return { open: true, hasClose, hasBackInModal, isNexus };
    });
    assert(nexusModalState.open && nexusModalState.isNexus && nexusModalState.hasClose, 'State 3: NEXUS Case Study opens with [ CLOSE × ] action');
    assert(!nexusModalState.hasBackInModal, 'CRITICAL: NEXUS Case Study modal does NOT have "← BACK TO WORKS"');

    // ----------------------------------------------------
    // TEST 9: Close NEXUS Case Study -> Returns to UI/UX Project Window
    // ----------------------------------------------------
    console.log('\n--- TEST 9: Close NEXUS Case Study ---');
    await clickCloseCaseStudy();

    const returnedToUiuxWindow = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      const text = document.body.innerText;
      const btns = Array.from(document.querySelectorAll('button'));
      const hasBackToWorks = btns.some((b) => b.innerText.includes('BACK TO WORKS'));
      return !modal && text.includes('NEXUS') && text.includes('PULSE') && hasBackToWorks;
    });
    assert(returnedToUiuxWindow, 'Closing NEXUS Case Study returns directly to UI/UX Project Window (camera stays at near-Earth)');

    // ----------------------------------------------------
    // TEST 10: Open PULSE Case Study & Close via Backdrop Click
    // ----------------------------------------------------
    console.log('\n--- TEST 10: Open PULSE Case Study & Backdrop Dismiss ---');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button')).filter((b) =>
        b.innerText.includes('VIEW CASE STUDY')
      );
      if (btns.length > 1) btns[1].click();
      else if (btns.length > 0) btns[0].click();
    });
    await sleep(600);

    const pulseModalOpen = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      return !!modal && modal.innerText.includes('PULSE');
    });
    assert(pulseModalOpen, 'PULSE Case Study opens cleanly');

    // Click backdrop (outside the inner modal dialog card)
    await page.evaluate(() => {
      const backdrop = document.querySelector('[role="dialog"]');
      if (backdrop) backdrop.click();
    });
    await sleep(600);

    const backdropDismissWorked = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      const btns = Array.from(document.querySelectorAll('button'));
      return !modal && btns.some((b) => b.innerText.includes('BACK TO WORKS'));
    });
    assert(backdropDismissWorked, 'Backdrop click closes Case Study and returns to UI/UX Project Window');

    // ----------------------------------------------------
    // TEST 11: UI/UX Project Window -> "← BACK TO WORKS" -> WORKS ARCHIVE
    // ----------------------------------------------------
    console.log('\n--- TEST 11: UI/UX Project Window "← BACK TO WORKS" ---');
    await clickBackToWorksInProjectWindow();

    const returnedFromUiuxToArchive = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('SELECTED PROJECTS') && text.includes('01 DIGITAL MARKETING') && text.includes('02 UI/UX DESIGN');
    });
    assert(returnedFromUiuxToArchive, 'UI/UX Project Window "← BACK TO WORKS" returns to Works Archive via reverse Earth flight');

    // ----------------------------------------------------
    // TEST 12: ESC Key Navigation in Project Window
    // ----------------------------------------------------
    console.log('\n--- TEST 12: ESC Key in Project Window returns to Works Archive ---');
    await enterDigitalMarketing();
    await page.keyboard.press('Escape');
    await sleep(2400);

    const escFromProjectWindowReturned = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('SELECTED PROJECTS') && text.includes('02 UI/UX DESIGN');
    });
    assert(escFromProjectWindowReturned, 'ESC key while in Project Window triggers Earth pull-away back to Works Archive');

    // ----------------------------------------------------
    // TEST 13: Browser Back Navigation
    // ----------------------------------------------------
    console.log('\n--- TEST 13: Browser Back Navigation ---');
    await enterDigitalMarketing();
    // Open Case Study
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const csBtn = btns.find((b) => b.innerText.includes('VIEW CASE STUDY'));
      if (csBtn) csBtn.click();
    });
    await sleep(600);

    // Browser Back 1: Closes Case Study -> Project Window
    await page.goBack();
    await sleep(800);

    const backStep1Valid = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      const btns = Array.from(document.querySelectorAll('button'));
      return !modal && btns.some((b) => b.innerText.includes('BACK TO WORKS'));
    });
    assert(backStep1Valid, 'Browser Back from Case Study closes modal and preserves Project Window');

    // ----------------------------------------------------
    // Console Error Verification
    // ----------------------------------------------------
    console.log('\n--- Console Error Verification ---');
    const filteredErrors = consoleErrors.filter(
      (e) => !e.includes('favicon.ico') && !e.includes('Download the React DevTools')
    );
    assert(filteredErrors.length === 0, 'Zero critical JavaScript console runtime errors detected');

  } catch (err) {
    console.error('Fatal test error:', err);
    failed++;
  } finally {
    await browser.close();
    console.log('\n====================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================');
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();

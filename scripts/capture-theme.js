const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(2000); // Wait for the new CSS to load and animations to start
  
  const artifactPath = path.join('C:', 'Users', 'nitpatil', '.gemini', 'antigravity-ide', 'brain', 'bc8ae442-4430-4a09-99b1-ebe5fcc2a94c', 'frosted_light_mode.png');
  
  await page.screenshot({ path: artifactPath, fullPage: true });
  
  await browser.close();
  console.log('Screenshot saved to artifacts');
})();

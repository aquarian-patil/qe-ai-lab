const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000); // wait for animations and recharts to render

  const screenshots = {};

  // 1. Header Logo
  console.log('Capturing Header...');
  const header = await page.locator('header').first();
  screenshots.header = (await header.screenshot()).toString('base64');

  // 2. Sidebar
  console.log('Capturing Sidebar...');
  const sidebar = await page.locator('aside').first();
  screenshots.sidebar = (await sidebar.screenshot()).toString('base64');

  // 3. Trend Graph
  console.log('Capturing Trend Graph...');
  // Find the text "6-Month Maturity Trend" and go up to its container
  const graphContainer = await page.locator('text="6-Month Maturity Trend"').locator('..');
  screenshots.graph = (await graphContainer.screenshot()).toString('base64');

  // 4. Current Score
  console.log('Capturing Score Card...');
  const scoreCard = await page.locator('text="Current Maturity"').locator('..');
  screenshots.score = (await scoreCard.screenshot()).toString('base64');

  // 5. Navigate to Pipeline
  console.log('Navigating to Pipeline...');
  await page.goto('http://localhost:3000/pipeline');
  await page.waitForTimeout(1000);
  console.log('Capturing DAG...');
  const dag = await page.locator('text="Agentic UI Pipeline"').locator('..').locator('..');
  screenshots.dag = (await dag.screenshot()).toString('base64');

  // Generate HTML
  const html = `
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
          .component { margin-bottom: 60px; page-break-inside: avoid; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
          img { max-width: 100%; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; }
          .qa-row { margin-bottom: 15px; }
          .label { font-weight: bold; width: 100px; display: inline-block; color: #555; }
          .value { display: inline-block; width: calc(100% - 120px); vertical-align: top; }
        </style>
      </head>
      <body>
        <div style="font-size: 32px; font-weight: 900; margin-bottom: 50px; text-align: center;">Nexus AI: Screen Grab Component Analysis</div>

        <div class="component">
          <div class="title">1. Global Header & Logo</div>
          <img src="data:image/png;base64,${screenshots.header}" />
          <div class="qa-row"><span class="label">What</span><span class="value">Displays the animated Nexus AI logo, search bar, and user profile avatar.</span></div>
          <div class="qa-row"><span class="label">Why</span><span class="value">Establishes brand identity and provides global context/search functionality across all pages.</span></div>
          <div class="qa-row"><span class="label">How</span><span class="value">Built using Next.js Link for routing and Tailwind CSS for the pulsing neon glow effects.</span></div>
          <div class="qa-row"><span class="label">When</span><span class="value">Visible at all times at the top of the application layout.</span></div>
        </div>

        <div class="component">
          <div class="title">2. Enterprise Navigation Sidebar</div>
          <img src="data:image/png;base64,${screenshots.sidebar}" />
          <div class="qa-row"><span class="label">What</span><span class="value">The primary navigation menu routing to Dashboards, God Mode, Sandboxes, and Governance.</span></div>
          <div class="qa-row"><span class="label">Why</span><span class="value">To organize the massive scale of the application into logical domains (Testing, Governance, Orchestration).</span></div>
          <div class="qa-row"><span class="label">How</span><span class="value">Uses Next.js client-side routing. The RBAC profile at the bottom is fetched from the AuthService.</span></div>
          <div class="qa-row"><span class="label">When</span><span class="value">Used by the user whenever they need to switch contexts or verify their active role.</span></div>
        </div>

        <div class="component">
          <div class="title">3. 6-Month Maturity Trend Graph</div>
          <img src="data:image/png;base64,${screenshots.graph}" />
          <div class="qa-row"><span class="label">What</span><span class="value">Visualizes the organization's DevSecOps maturity score improvement over time.</span></div>
          <div class="qa-row"><span class="label">Why</span><span class="value">Provides historical context so executives can track the ROI and impact of the AI platform over months.</span></div>
          <div class="qa-row"><span class="label">How</span><span class="value">Powered by the Recharts React library, rendering SVG area charts with dynamic cyan gradients.</span></div>
          <div class="qa-row"><span class="label">When</span><span class="value">Reviewed during monthly executive alignment meetings to measure organizational progress.</span></div>
        </div>

        <div class="component">
          <div class="title">4. Real-Time Maturity L-Score</div>
          <img src="data:image/png;base64,${screenshots.score}" />
          <div class="qa-row"><span class="label">What</span><span class="value">Displays the real-time blended Level score (L1 - L5) for the organization's automation maturity.</span></div>
          <div class="qa-row"><span class="label">Why</span><span class="value">Gives an immediate, high-level snapshot of the current state of absolute autonomy.</span></div>
          <div class="qa-row"><span class="label">How</span><span class="value">Fetches real-time JSON data from the MaturityScoringService API and applies extreme CSS drop-shadows.</span></div>
          <div class="qa-row"><span class="label">When</span><span class="value">Viewed immediately upon logging in to gauge current system health.</span></div>
        </div>

        <div class="component">
          <div class="title">5. CI/CD Pipeline Viewer DAG</div>
          <img src="data:image/png;base64,${screenshots.dag}" />
          <div class="qa-row"><span class="label">What</span><span class="value">Visually represents the Directed Acyclic Graph (DAG) execution flow of the Agentic, Security, and NFR pipelines.</span></div>
          <div class="qa-row"><span class="label">Why</span><span class="value">Users need to understand the sequence of events and see exactly which pipeline swarm is currently running.</span></div>
          <div class="qa-row"><span class="label">How</span><span class="value">Uses React state timers to simulate execution, appending CSS pulse animations to nodes as they activate.</span></div>
          <div class="qa-row"><span class="label">When</span><span class="value">Monitored in real-time when a user triggers an autonomous execution run across the ecosystem.</span></div>
        </div>

      </body>
    </html>
  `;

  console.log('Generating PDF...');
  const pdfPath = path.join(process.cwd(), 'Nexus_AI_Component_Analysis.pdf');
  const artifactPath = path.join('C:', 'Users', 'nitpatil', '.gemini', 'antigravity-ide', 'brain', 'bc8ae442-4430-4a09-99b1-ebe5fcc2a94c', 'Nexus_AI_Component_Analysis.pdf');
  
  await page.setContent(html);
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '40px', bottom: '40px' } });
  
  // Also copy to artifacts so it shows up in the UI
  fs.copyFileSync(pdfPath, artifactPath);

  await browser.close();
  console.log('PDF generated at:', artifactPath);
})();

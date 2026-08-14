const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const componentsToGrab = [
  // GLOBAL LAYOUT
  {
    path: '/',
    locator: 'header a',
    name: 'Nexus AI Header Logo',
    what: 'Displays the animated Nexus AI logo and acts as a home button.',
    why: 'Establishes brand identity and provides a persistent escape hatch back to the dashboard.',
    how: 'Built using Tailwind CSS animations (animate-pulse), absolute positioning for glow effects, and a Next.js Link component.',
    when: 'Visible at all times at the top left of the application layout.'
  },
  {
    path: '/',
    locator: 'input[placeholder="Search tests, agents..."]',
    name: 'Global Search Bar',
    what: 'A global search input field for quickly finding agents or tests.',
    why: 'Accelerates navigation for power users in a massive ecosystem.',
    how: 'An HTML input element styled with Tailwind transparent borders and focus rings.',
    when: 'Used when a user knows exactly what entity they are looking for.'
  },
  {
    path: '/',
    locator: 'aside nav',
    name: 'Sidebar Navigation Menu',
    what: 'The primary navigation menu routing to Dashboards, God Mode, Sandboxes, and Governance.',
    why: 'Organizes the massive scale of the application into logical domains.',
    how: 'Next.js client-side routing with active state hover styling.',
    when: 'Used whenever the user needs to switch contexts between modules.'
  },
  {
    path: '/',
    locator: 'aside .mt-auto',
    name: 'RBAC Profile Indicator',
    what: 'Displays the active user session and their Role (e.g., System Admin).',
    why: 'Critical for Enterprise Governance so users know their current authorization level.',
    how: 'Fetches state from the local AuthService singleton to render the user profile card.',
    when: 'Visible at all times at the bottom of the sidebar.'
  },
  // DASHBOARD
  {
    path: '/',
    locator: 'text="6-Month Maturity Trend" >> ..',
    name: 'Maturity Trend Graph',
    what: 'Visualizes the organization DevSecOps maturity score improvement over time.',
    why: 'Provides historical context so executives can track the ROI of the AI platform.',
    how: 'Powered by the Recharts React library, rendering SVG area charts with dynamic gradients.',
    when: 'Reviewed during monthly executive alignment meetings.'
  },
  {
    path: '/',
    locator: 'text="Current Maturity" >> ..',
    name: 'Current Maturity L-Score',
    what: 'Displays the real-time blended Level score (L1 - L5).',
    why: 'Gives an immediate, high-level snapshot of the current state of absolute autonomy.',
    how: 'Fetches real-time JSON data from the MaturityScoringService API.',
    when: 'Viewed immediately upon logging in to gauge current system health.'
  },
  {
    path: '/',
    locator: 'text="Code Quality" >> .. >> ..',
    name: 'DevSecOps Pillar Cards',
    what: 'Breaks down the overarching maturity score into specific domains (Code, Agentic, CI/CD, Security).',
    why: 'If the overall score drops, users need to know exactly which pillar is failing.',
    how: 'Reads the specific score fields from the API and maps values to inline CSS width for progress bars.',
    when: 'Used by Engineering Managers to identify bottlenecks in their specific domain.'
  },
  {
    path: '/',
    locator: 'text="Testing Sandboxes" >> .. >> ..',
    name: 'Testing Sandbox Routers',
    what: 'Interactive cards linking directly to the GenAI, Agent, and Arena sandboxes.',
    why: 'Provides quick access to the testing evaluation tools directly from the dashboard.',
    how: 'Next.js Link components wrapped in Tailwind glassmorphism cards with hover transitions.',
    when: 'Used when a developer wants to manually trigger a test simulation.'
  },
  // GENESIS
  {
    path: '/genesis',
    locator: 'textarea',
    name: 'Unstructured Requirement Input',
    what: 'Accepts raw, unstructured English text or copy-pasted PRDs.',
    why: 'The core philosophy is "One Input". Users should not have to fill out complex forms.',
    how: 'A controlled React textarea that binds to state and pushes the payload to the genesis API.',
    when: 'Used at the very beginning of a new feature lifecycle or sprint.'
  },
  {
    path: '/genesis',
    locator: 'button:has-text("Ignite Genesis")',
    name: 'Ignite Swarm Button',
    what: 'Triggers the massive multi-agent AI pipeline.',
    why: 'The singular action button required to kick off autonomous software generation.',
    how: 'HTML button that triggers a simulated async fetch call and shows a pulsing loading state.',
    when: 'Clicked after pasting requirements into the text box.'
  },
  {
    path: '/genesis',
    locator: 'button:has-text("React UI") >> ..',
    name: 'SDLC Artifact Tabs',
    what: 'Tabbed interface showing BDD, React UI, SQL, Playwright, etc.',
    why: 'Organizes the massive output of the AI Swarm into digestible, domain-specific code blocks.',
    how: 'React state variable controls conditional rendering of syntax-highlighted code blocks.',
    when: 'Used to review the generated code artifacts produced by the Swarm.'
  },
  // PIPELINE
  {
    path: '/pipeline',
    locator: 'text="Agentic UI Pipeline" >> .. >> ..',
    name: 'Pipeline Orchestration DAG',
    what: 'Visually represents the Directed Acyclic Graph (DAG) execution flow of the swarms.',
    why: 'Users need to understand the sequence of events and see exactly which pipeline is currently running.',
    how: 'Uses React state timers to simulate execution, appending CSS pulse animations to active nodes.',
    when: 'Monitored in real-time when a user triggers an autonomous CI/CD execution.'
  },
  {
    path: '/pipeline',
    locator: 'text="nexus-orchestrator-tty" >> .. >> ..',
    name: 'Live Terminal Console',
    what: 'Streams raw output logs from the executing pipelines in a terminal-like UI.',
    why: 'Developers and DevOps engineers need deep technical context if a node in the DAG fails.',
    how: 'An array of log strings is sequentially pushed into a React state array with overflow-y-auto scrolling.',
    when: 'Read by engineers while the pipeline is executing.'
  },
  // INTEGRATIONS
  {
    path: '/integrations',
    locator: 'text="Version Control (Git)" >> ..',
    name: 'Git Provider Configuration',
    what: 'Allows users to select between GitHub, GitLab, and Bitbucket.',
    why: 'Enables vendor-agnostic architecture so the AI can pull code from any source.',
    how: 'React state toggles the active selection and passes it to the IntegrationFactory pattern on the backend.',
    when: 'Configured once during initial platform setup by the System Admin.'
  },
  {
    path: '/integrations',
    locator: 'text="Database Operations" >> ..',
    name: 'API Credential Inputs',
    what: 'Secure input fields for API keys and connection URIs.',
    why: 'Required to authenticate the AI agents to external enterprise systems.',
    how: 'Standard password-type input fields with masked characters.',
    when: 'Used when onboarding a new database or ALM tool.'
  },
  // APPROVALS
  {
    path: '/approvals',
    locator: 'text="HITL Pending Request Card" >> ..',
    name: 'HITL Pending Request Card',
    what: 'Suspends a high-risk AI action and waits for a human administrator to authorize it.',
    why: 'AI autonomy is dangerous without guardrails. Prevents destructive actions on Production.',
    how: 'The backend HitlService intercepts the action. The UI fetches it and provides POST routes to resolve it.',
    when: 'Reviewed daily by System Admins before major code merges or load tests.',
    fallback: 'text="No pending approvals." >> ..' // Capture the empty state if queue is empty
  },
  // ARENA
  {
    path: '/sandboxes/agentic-arena',
    locator: 'text="Browser Viewport" >> .. >> .. >> ..',
    name: 'Agentic Arena Dual-Pane Viewer',
    what: 'Split screen simulating a live E2E test execution and self-healing.',
    why: 'Tangibly proves the concept of Self-Healing Tests without requiring a local Playwright environment.',
    how: 'Choreographed React state changes the Left UI while streaming pre-written logs to the Right terminal.',
    when: 'Used for demonstrations to showcase the absolute cutting-edge power of Agentic QE.'
  }
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

  // Pre-seed HITL queue so the card exists
  await page.request.post('http://localhost:3000/api/governance/hitl', {
    data: { action: 'REQUEST', pipeline: 'Automated Playwright Suite', description: 'Requesting permission to run destructive End-to-End tests against Production.', riskLevel: 'CRITICAL' }
  });

  let htmlBody = `<div style="font-size: 32px; font-weight: 900; margin-bottom: 50px; text-align: center; color: #222;">Nexus AI: Exhaustive Component Analysis</div>`;

  for (let i = 0; i < componentsToGrab.length; i++) {
    const comp = componentsToGrab[i];
    console.log(`Navigating to ${comp.path} to capture ${comp.name}...`);
    await page.goto(`http://localhost:3000${comp.path === '/' ? '' : comp.path}`);
    await page.waitForTimeout(1000); // Wait for animations/data to load

    // For genesis, we need to click the button and wait so the tabs show up
    if (comp.name === 'SDLC Artifact Tabs') {
      await page.fill('textarea', 'Build me a login page');
      await page.click('button:has-text("Ignite Genesis")');
      await page.waitForTimeout(3000); // Wait for generation to finish
    }

    try {
      let locator = await page.locator(comp.locator).first();
      // Test if locator exists
      const count = await locator.count();
      if (count === 0 && comp.fallback) {
        locator = await page.locator(comp.fallback).first();
      }

      const buffer = await locator.screenshot({ timeout: 5000 });
      const base64 = buffer.toString('base64');

      htmlBody += `
        <div class="component" style="margin-bottom: 60px; page-break-inside: avoid; background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div class="title" style="font-size: 24px; font-weight: bold; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; color: #111;">
            ${i + 1}. ${comp.name}
          </div>
          <div style="background: #000; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
            <img src="data:image/png;base64,${base64}" style="max-width: 100%; max-height: 400px; border: 1px solid #333; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.5); object-fit: contain;" />
          </div>
          <div style="margin-bottom: 15px;"><span style="font-weight: 800; width: 100px; display: inline-block; color: #555;">What</span><span style="display: inline-block; width: calc(100% - 120px); vertical-align: top; color: #333; line-height: 1.5;">${comp.what}</span></div>
          <div style="margin-bottom: 15px;"><span style="font-weight: 800; width: 100px; display: inline-block; color: #555;">Why</span><span style="display: inline-block; width: calc(100% - 120px); vertical-align: top; color: #333; line-height: 1.5;">${comp.why}</span></div>
          <div style="margin-bottom: 15px;"><span style="font-weight: 800; width: 100px; display: inline-block; color: #555;">How</span><span style="display: inline-block; width: calc(100% - 120px); vertical-align: top; color: #333; line-height: 1.5;">${comp.how}</span></div>
          <div style="margin-bottom: 15px;"><span style="font-weight: 800; width: 100px; display: inline-block; color: #555;">When</span><span style="display: inline-block; width: calc(100% - 120px); vertical-align: top; color: #333; line-height: 1.5;">${comp.when}</span></div>
        </div>
      `;
      console.log(`Captured ${comp.name}`);
    } catch (err) {
      console.error(`Failed to capture ${comp.name}: ${err.message}`);
    }
  }

  const html = `
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #333; background: #f9fafb; }
        </style>
      </head>
      <body>
        ${htmlBody}
      </body>
    </html>
  `;

  console.log('Generating True Exhaustive PDF...');
  const pdfPath = path.join(process.cwd(), 'Nexus_AI_Exhaustive_Analysis.pdf');
  const artifactPath = path.join('C:', 'Users', 'nitpatil', '.gemini', 'antigravity-ide', 'brain', 'bc8ae442-4430-4a09-99b1-ebe5fcc2a94c', 'Nexus_AI_Exhaustive_Analysis.pdf');
  const desktopPath = path.join('C:', 'Users', 'nitpatil', 'OneDrive - Publicis Groupe', 'Desktop', 'Nexus_AI_Exhaustive_Analysis.pdf');
  
  const printPage = await browser.newPage();
  await printPage.setContent(html);
  await printPage.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '40px', bottom: '40px' } });
  
  fs.copyFileSync(pdfPath, artifactPath);
  fs.copyFileSync(pdfPath, desktopPath); // Save directly to desktop again!

  await browser.close();
  console.log('Exhaustive PDF generated at Desktop!');
})();

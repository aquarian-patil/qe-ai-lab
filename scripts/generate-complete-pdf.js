const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const componentsToGrab = [
  // 1. Global Navigation
  { path: '/', locator: 'header a', name: 'Top Header & Logo', what: 'Animated Nexus AI logo acting as a home button.', why: 'Brand identity and primary escape hatch.', how: 'Tailwind animate-pulse, Next.js Link.', when: 'Always visible globally.' },
  { path: '/', locator: 'input[placeholder="Search tests, agents..."]', name: 'Global Search Bar', what: 'Global search input field.', why: 'Accelerates navigation for power users.', how: 'HTML input with Tailwind focus rings.', when: 'Used to directly query the ecosystem.' },
  { path: '/', locator: 'aside nav', name: 'Main Sidebar Links Container', what: 'Primary navigation menu.', why: 'Organizes the massive scale into logical domains.', how: 'Next.js client-side routing.', when: 'Used to switch contexts between modules.' },
  { path: '/', locator: 'aside .mt-auto', name: 'RBAC Profile Card', what: 'Displays the active user session and Role.', why: 'Critical for Enterprise Governance awareness.', how: 'Fetches state from AuthService.', when: 'Visible at the bottom of the sidebar globally.' },

  // 2. Executive Dashboard
  { path: '/', locator: 'h2:has-text("Executive Command Center") >> .. >> ..', name: 'Command Center Header', what: 'The main dashboard title and context.', why: 'Contextualizes the page for executives.', how: 'Tailwind flexbox with gradient backgrounds.', when: 'Viewed upon landing.' },
  { path: '/', locator: 'text="View Audit Log"', name: '"View Audit Log" Button', what: 'Quick link to governance records.', why: 'Directs auditors to compliance logs immediately.', how: 'Next.js Link with glassmorphism styles.', when: 'Used during compliance checks.' },
  { path: '/', locator: 'text="Trigger Autonomous Run"', name: '"Trigger Autonomous Run" Button', what: 'Quick link to God Mode.', why: 'Primary Call-to-Action for value generation.', how: 'Next.js Link with heavy cyan drop shadows.', when: 'Used to start a new sprint or generation.' },
  { path: '/', locator: 'text="6-Month Maturity Trend" >> ..', name: '6-Month Maturity Trend Graph', what: 'Visualizes DevSecOps maturity score improvement.', why: 'Tracks ROI of the AI platform over months.', how: 'Recharts area chart with SVG gradients.', when: 'Reviewed during executive alignment.' },
  { path: '/', locator: 'text="Current Maturity" >> ..', name: 'Real-time L-Score Pulsing Card', what: 'Displays real-time blended Level score.', why: 'High-level snapshot of absolute autonomy.', how: 'Fetches JSON data from MaturityScoringService.', when: 'Gauging current system health instantly.' },
  { path: '/', locator: 'text="Code Quality" >> .. >> ..', name: 'Code Quality Pillar Card', what: 'Specific domain maturity score breakdown.', why: 'Identifies code quality bottlenecks.', how: 'Reads API score fields, maps to CSS width bar.', when: 'Used by Engineering Managers.' },
  { path: '/', locator: 'text="Agentic Testing" >> .. >> ..', name: 'Agentic Testing Pillar Card', what: 'Specific domain maturity score breakdown.', why: 'Identifies QE automation bottlenecks.', how: 'Reads API score fields, maps to CSS width bar.', when: 'Used by QA Managers.' },
  { path: '/', locator: 'text="CI/CD Velocity" >> .. >> ..', name: 'CI/CD Velocity Pillar Card', what: 'Specific domain maturity score breakdown.', why: 'Identifies deployment bottlenecks.', how: 'Reads API score fields, maps to CSS width bar.', when: 'Used by DevOps.' },
  { path: '/', locator: 'text="Security & NFR" >> .. >> ..', name: 'Security & NFR Pillar Card', what: 'Specific domain maturity score breakdown.', why: 'Identifies vulnerability bottlenecks.', how: 'Reads API score fields, maps to CSS width bar.', when: 'Used by CISO.' },

  // 3. Genesis Engine
  { path: '/genesis', locator: 'header', name: 'Genesis Engine Page Header', what: 'Title and description of God Mode.', why: 'Sets expectations for the omni-ingestion portal.', how: 'HTML Header with bg-clip-text styling.', when: 'When entering God mode.' },
  { path: '/genesis', locator: 'textarea', name: 'Unstructured Requirement Textarea', what: 'Accepts raw, unstructured English text.', why: 'Core "One Input" philosophy.', how: 'Controlled React textarea binding to state.', when: 'Beginning of a new feature generation.' },
  { path: '/genesis', locator: 'text="Drag & Drop Image or PDF Spec" >> ..', name: 'Drag & Drop File Upload Zone', what: 'Visual drop zone for multi-modal files.', why: 'Supports Gemini 2.0 multi-modal inputs.', how: 'Dashed CSS borders with hover states.', when: 'When users have visual mocks instead of text.' },
  { path: '/genesis', locator: 'button:has-text("Ignite Genesis")', name: '"Ignite Genesis" Action Button', what: 'Triggers the multi-agent AI pipeline.', why: 'Singular action to kick off software generation.', how: 'Button triggering async fetch call with loading state.', when: 'Clicked after pasting requirements.' },
  { path: '/genesis', locator: 'text="Awaiting Input Matrix..." >> ..', name: 'SDLC Artifact Generation Matrix (Empty)', what: 'Placeholder for the artifact viewer.', why: 'Indicates where output will appear.', how: 'Conditional React render based on null result.', when: 'Before generation occurs.' },
  // Note: Tab locators require actual generation first. 

  // 4. CI/CD Pipeline Viewer
  { path: '/pipeline', locator: 'header', name: 'Pipeline Page Header', what: 'Title and context for the Pipeline Viewer.', why: 'Contextualizes the DAG visualization.', how: 'Flexbox header with borders.', when: 'When opening the pipeline.' },
  { path: '/pipeline', locator: 'button:has-text("Trigger Pipeline")', name: '"Trigger Pipeline" Action Button', what: 'Manually starts the orchestration flow.', why: 'Allows manual overrides of webhook triggers.', how: 'React onClick handler setting running state.', when: 'Used to force a pipeline run.' },
  { path: '/pipeline', locator: 'h4:has-text("Agentic UI Pipeline") >> .. >> ..', name: 'Agentic UI Pipeline Node (DAG)', what: 'Visual node in the Directed Acyclic Graph.', why: 'Shows execution flow of UI swarms.', how: 'CSS borders with dynamic pulse animations.', when: 'Monitored during real-time runs.' },
  { path: '/pipeline', locator: 'h4:has-text("Security Pipeline") >> .. >> ..', name: 'Security Pipeline Node (DAG)', what: 'Visual node in the Directed Acyclic Graph.', why: 'Shows execution flow of DAST/SAST.', how: 'CSS borders with dynamic pulse animations.', when: 'Monitored during real-time runs.' },
  { path: '/pipeline', locator: 'h4:has-text("NFR Pipeline") >> .. >> ..', name: 'NFR Pipeline Node (DAG)', what: 'Visual node in the Directed Acyclic Graph.', why: 'Shows execution flow of Load Generation.', how: 'CSS borders with dynamic pulse animations.', when: 'Monitored during real-time runs.' },
  { path: '/pipeline', locator: 'text="nexus-orchestrator-tty" >> .. >> ..', name: 'The Live Terminal Console Pane', what: 'Streams raw output logs.', why: 'Deep technical context for failures.', how: 'Array mapped to div rows with overflow-y-auto.', when: 'Read while pipelines execute.' },

  // 5. Integrations
  { path: '/integrations', locator: 'header', name: 'Integrations Page Header', what: 'Context for vendor configuration.', why: 'Explains the IntegrationFactory purpose.', how: 'Standard flex header.', when: 'Setting up the environment.' },
  { path: '/integrations', locator: 'button:has-text("Save Configuration")', name: '"Save Configuration" Button', what: 'Saves the current adapter state.', why: 'Persists integrations.', how: 'React onClick triggering visual feedback.', when: 'After selecting adapters.' },
  { path: '/integrations', locator: 'text="Version Control (Git)" >> ..', name: 'Version Control Selector Block', what: 'Allows selection of Git providers.', why: 'Enables vendor-agnostic architecture.', how: 'React state toggling active classes.', when: 'Initial platform setup.' },
  { path: '/integrations', locator: 'label:has-text("API Token") >> ..', name: 'Git API Token Input Field', what: 'Secure input field for tokens.', why: 'Authenticates AI to external systems.', how: 'Password type input.', when: 'Onboarding a new system.' },
  { path: '/integrations', locator: 'text="Database Operations" >> ..', name: 'Database Operations Selector Block', what: 'Selects the target database.', why: 'Enables DB-agnostic SQL generation.', how: 'React state toggling.', when: 'Initial setup.' },
  { path: '/integrations', locator: 'label:has-text("Connection String URI") >> ..', name: 'Connection String URI Input Field', what: 'Secure input for DB URI.', why: 'Authenticates AI to databases.', how: 'Password type input.', when: 'Onboarding a DB.' },
  { path: '/integrations', locator: 'text="Issue Tracking & Documentation" >> ..', name: 'Issue Tracking Selector Block', what: 'Selects Jira or Azure DevOps.', why: 'Enables auto-defect logging.', how: 'React state toggling.', when: 'Initial setup.' },

  // 6. Approvals
  { path: '/approvals', locator: 'header', name: 'Approvals Page Header', what: 'Context for HITL.', why: 'Explains the safety guardrails.', how: 'Standard flex header.', when: 'When auditing AI actions.' },
  { path: '/approvals', locator: '.p-6.rounded-xl.border', name: 'The Pending Approval Card', what: 'Suspends a high-risk AI action.', why: 'Prevents destructive actions on Prod.', how: 'Fetched from HitlService queue.', when: 'Reviewed by Admins daily.' },

  // 7. Audit Log
  { path: '/audit', locator: 'header', name: 'Audit Log Page Header', what: 'Context for the audit trail.', why: 'Explains compliance requirements.', how: 'Standard flex header.', when: 'During security audits.' },
  { path: '/audit', locator: '.bg-black\\/20.border.rounded-xl.overflow-hidden', name: 'The 5-Column Audit Data Table', what: 'Permanent history of every action.', why: 'Required for SOC2 compliance.', how: 'Reads from JSON storage via AuditLogger.', when: 'During incident post-mortems.' },

  // 8. Sandboxes
  { path: '/sandboxes/gen-ai', locator: 'header', name: 'GenAI Evaluator Header', what: 'Context for the GenAI sandbox.', why: 'Explains Logic validation.', how: 'Standard flex header.', when: 'Validating BDD docs.' },
  { path: '/sandboxes/ai-agent', locator: 'text="Agent Simulation Sandbox" >> ..', name: 'Agent Simulator Header', what: 'Context for the Agent sandbox.', why: 'Explains API simulation.', how: 'Standard flex header.', when: 'Validating API specs.' },
  { path: '/sandboxes/agentic-arena', locator: 'header', name: 'Agentic Arena Dual-Pane Header', what: 'Context for E2E simulation.', why: 'Explains Playwright self-healing.', how: 'Standard flex header.', when: 'Showcasing Agentic QE.' },
  { path: '/sandboxes/agentic-arena', locator: 'text="Browser Viewport" >> .. >> ..', name: 'Agentic Arena Left-pane React Viewport', what: 'Simulated React UI component.', why: 'Tangible target for self-healing tests.', how: 'CSS styling imitating a browser window.', when: 'During Arena test runs.' },
  { path: '/sandboxes/agentic-arena', locator: 'text="Playwright Test Runner" >> .. >> ..', name: 'Agentic Arena Right-pane Log Stream', what: 'Simulated Playwright execution logs.', why: 'Proves the autonomous testing capabilities.', how: 'Choreographed React state changes.', when: 'During Arena test runs.' }
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

  // 1. Inject a HITL Request so the Approvals queue isn't empty
  await page.request.post('http://localhost:3000/api/governance/hitl', {
    data: { action: 'REQUEST', pipeline: 'Automated Playwright Suite', description: 'Requesting permission to run destructive End-to-End tests against Production.', riskLevel: 'CRITICAL' }
  });

  // 2. Inject an Audit Log entry so the table has data
  await page.request.post('http://localhost:3000/api/governance/audit', {
    data: { actor: 'System Admin', action: 'HITL APPROVED', target: 'Automated Playwright Suite', status: 'SUCCESS' }
  });

  let htmlBody = `<div style="font-size: 32px; font-weight: 900; margin-bottom: 50px; text-align: center; color: #222; text-transform: uppercase; letter-spacing: 2px;">Nexus AI: Complete 40-Component Extraction</div>`;

  for (let i = 0; i < componentsToGrab.length; i++) {
    const comp = componentsToGrab[i];
    console.log(`Navigating to ${comp.path} to capture ${comp.name}...`);
    await page.goto(`http://localhost:3000${comp.path === '/' ? '' : comp.path}`);
    await page.waitForTimeout(1000); 

    try {
      const locator = await page.locator(comp.locator).first();
      const buffer = await locator.screenshot({ timeout: 5000 });
      const base64 = buffer.toString('base64');

      htmlBody += `
        <div class="component" style="margin-bottom: 60px; page-break-inside: avoid; background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-left: 6px solid #06b6d4;">
          <div class="title" style="font-size: 22px; font-weight: 900; margin-bottom: 25px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px; color: #111;">
            ${i + 1}. ${comp.name} <span style="float:right; font-size: 14px; font-weight: normal; color: #888; background: #f4f4f4; padding: 4px 10px; border-radius: 20px;">Route: ${comp.path}</span>
          </div>
          <div style="background: #111; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <img src="data:image/png;base64,${base64}" style="max-width: 100%; max-height: 450px; border: 1px solid #333; border-radius: 8px; box-shadow: 0 10px 20px rgba(0,0,0,0.4); object-fit: contain;" />
          </div>
          <div style="margin-bottom: 18px;"><span style="font-weight: 900; width: 120px; display: inline-block; color: #06b6d4; text-transform: uppercase; font-size: 12px; tracking-widest;">What</span><span style="display: inline-block; width: calc(100% - 140px); vertical-align: top; color: #333; line-height: 1.6; font-size: 15px;">${comp.what}</span></div>
          <div style="margin-bottom: 18px;"><span style="font-weight: 900; width: 120px; display: inline-block; color: #06b6d4; text-transform: uppercase; font-size: 12px; tracking-widest;">Why</span><span style="display: inline-block; width: calc(100% - 140px); vertical-align: top; color: #333; line-height: 1.6; font-size: 15px;">${comp.why}</span></div>
          <div style="margin-bottom: 18px;"><span style="font-weight: 900; width: 120px; display: inline-block; color: #06b6d4; text-transform: uppercase; font-size: 12px; tracking-widest;">How</span><span style="display: inline-block; width: calc(100% - 140px); vertical-align: top; color: #333; line-height: 1.6; font-size: 15px;">${comp.how}</span></div>
          <div style="margin-bottom: 18px;"><span style="font-weight: 900; width: 120px; display: inline-block; color: #06b6d4; text-transform: uppercase; font-size: 12px; tracking-widest;">When</span><span style="display: inline-block; width: calc(100% - 140px); vertical-align: top; color: #333; line-height: 1.6; font-size: 15px;">${comp.when}</span></div>
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
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap');
          body { font-family: 'Inter', -apple-system, sans-serif; padding: 40px; color: #333; background: #e5e7eb; }
        </style>
      </head>
      <body>
        ${htmlBody}
      </body>
    </html>
  `;

  console.log('Generating Final Complete PDF...');
  const pdfPath = path.join(process.cwd(), 'Nexus_AI_Complete_Documentation.pdf');
  const desktopPath = path.join('C:', 'Users', 'nitpatil', 'OneDrive - Publicis Groupe', 'Desktop', 'Nexus_AI_Complete_Documentation.pdf');
  
  const printPage = await browser.newPage();
  await printPage.setContent(html);
  await printPage.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '40px', bottom: '40px' } });
  
  fs.copyFileSync(pdfPath, desktopPath); 
  console.log('Final Complete PDF generated at Desktop!');
  await browser.close();
})();

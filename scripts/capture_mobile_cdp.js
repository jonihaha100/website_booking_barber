const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const port = 9224;

  const chromeProc = spawn(chromePath, [
    '--headless',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  // Wait for Chrome to listen
  await new Promise(r => setTimeout(r, 1200));

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json`);
    const tabs = await listRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let id = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    // 1. Enable Page & Runtime
    await send('Page.enable');
    await send('Runtime.enable');

    // 2. Set mobile device emulation (iPhone 14 / standard mobile: 390x844)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      screenWidth: 390,
      screenHeight: 844
    });

    await send('Emulation.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
    });

    // 3. Navigate to portal
    await send('Page.navigate', { url: 'http://localhost:3000/estate-records.html?pin=2050' });

    // Wait 2 seconds for portal to render
    await new Promise(r => setTimeout(r, 2000));

    // 4. Capture standard mobile view
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    const outPath1 = '/Users/syamhariabidin/.gemini/antigravity/brain/5e99d8dd-3e81-4f5b-8e1a-b7df54a487c0/mobile_true_cdp_header.png';
    fs.writeFileSync(outPath1, Buffer.from(shot1.data, 'base64'));
    console.log('Saved mobile header view:', outPath1);

    // 5. Open mobile quick menu dropdown
    await send('Runtime.evaluate', {
      expression: `
        const dd = document.getElementById('portalMoreDropdown');
        if (dd) dd.classList.add('active');
      `
    });
    await new Promise(r => setTimeout(r, 400));

    // 6. Capture dropdown view
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    const outPath2 = '/Users/syamhariabidin/.gemini/antigravity/brain/5e99d8dd-3e81-4f5b-8e1a-b7df54a487c0/mobile_true_cdp_menu_open.png';
    fs.writeFileSync(outPath2, Buffer.from(shot2.data, 'base64'));
    console.log('Saved mobile menu open view:', outPath2);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

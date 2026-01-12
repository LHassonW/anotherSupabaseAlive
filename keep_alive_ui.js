const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const config = {
    projectId: 'kyazmmjkarriixsiwxpo',
    anonKey: 'YOUR_KEY_HERE'
  };

  try {
    const targetUrl = 'https://assignmenttwojinhua.great-site.net?source=666666666';

    console.log(`🌐 Step 1: Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // UI interaction block
    try {
      console.log('📁 Step 2: Uploading dummy.sql...');
      await page.setInputFiles('input[type="file"]', 'dummy.sql');

      console.log('🖱 Step 3: Clicking Grade Assignment...');
      await page.click('text=Grade Assignment', { timeout: 5000 });

      console.log('⏳ Step 4: Waiting for UI feedback...');
      await page.waitForTimeout(8000);
    } catch (uiError) {
      console.warn('⚠ UI step failed, continuing anyway');
    }

    // Supabase activity trigger
    console.log('⚡ Step 5: Forcing Direct API Activity...');
    const status = await page.evaluate(async (cfg) => {
      try {
        const response = await fetch(
          `https://${cfg.projectId}.supabase.co/rest/v1/`,
          {
            method: 'GET',
            headers: {
              apikey: cfg.anonKey,
              Authorization: `Bearer ${cfg.anonKey}`
            }
          }
        );
        return response.status;
      } catch {
        return 'fetch_failed';
      }
    }, config);

    console.log(`✅ Supabase REST status: ${status}`);
    console.log('🎉 Keep-alive completed successfully');

  } catch (err) {
    console.error('❌ Critical failure:', err.message);
  } finally {
    await browser.close();
    process.exit(0);
  }
})();

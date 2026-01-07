const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Your Specific Project Details
  const config = {
    projectId: 'kyazmmjkarriixsiwxpo',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5YXptbWprYXJyaWl4c2l3eHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNjA1ODgsImV4cCI6MjA4MDczNjU4OH0.AqiqgHWu2OVMgwZH5SVSk1NeaI7H2aDoGo7xCnZ01WE'
  };

  try {
    const targetUrl = 'https://assignmenttwojinhua.great-site.net?source=666666666';
    
    console.log(`🌐 Step 1: Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle' }); 

    console.log('📁 Step 2: Uploading dummy.sql...');
    await page.setInputFiles('input[type="file"]', 'dummy.sql');

    console.log('鼠标 Step 3: Clicking Grade Assignment...');
    await page.click('text=Grade Assignment'); 

    console.log('⏳ Step 4: Waiting for UI feedback...');
    await page.waitForTimeout(8000); 

    // --- THE FIX: WRAPPED IN A SINGLE OBJECT ---
    console.log('⚡ Step 5: Forcing Direct API Activity...');
    const status = await page.evaluate(async (cfg) => {
      try {
        // We hit the root REST endpoint to trigger an "Active" log
        const response = await fetch(`https://${cfg.projectId}.supabase.co/rest/v1/`, {
          method: 'GET',
          headers: { 
            'apikey': cfg.anonKey,
            'Authorization': `Bearer ${cfg.anonKey}` 
          }
        });
        return response.status;
      } catch (e) {
        return e.message;
      }
    }, config); // Pass the 'config' object as the single argument
    
    console.log(`📡 Supabase Response Status: ${status}`);
    console.log('✅ All actions completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during Keep-Alive:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();

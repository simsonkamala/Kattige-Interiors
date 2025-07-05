//==================== The Below code is Perfect and Good================================================

const puppeteer = require('puppeteer');

const scrapeImages = async () => {
  const url = 'https://www.justdial.com/Bangalore/Kattige-Interiors-Near-Green-Valley-School-Jp-Nagar/080PXX80-XX80-160604112527-J2Z2_BZDET/gallery';
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    await autoScroll(page);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const imgSrcs = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .map(img => img.getAttribute('data-src') || img.getAttribute('srcset') || img.getAttribute('src'))
        .filter(src => src && !src.startsWith('data:image'));
    });

    const formattedArray = imgSrcs.map(src => ({ src }));
    return formattedArray;
  } catch (err) {
    return { error: err.message };
  } finally {
    await browser.close();
  }
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

module.exports = scrapeImages;

// ============== The below Code Work More Fast Then Above Code =====================================


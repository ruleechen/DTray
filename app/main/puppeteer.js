const puppeteer = require('puppeteer');

module.exports = async ({
  appEnv,
}) => {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const localChromiums = await browserFetcher.localRevisions();

  if (localChromiums.length) {
    const { executablePath } = await browserFetcher.revisionInfo(localChromiums[0]);
    const browser = await puppeteer.launch({
      executablePath,
      headless: false,
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 2000,
      height: 1000,
    });

    await page.goto('https://cn.bing.com/');

    await new Promise((resolve) => {
      setTimeout(resolve, 5 * 1000);
    });
  }
};

import puppeteer from 'puppeteer';

async function scrapeTitle() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://www.wikipedia.org/');
  const title = await page.title();
  console.log(`Page Title: ${title}`);
  await browser.close();
}

scrapeTitle();
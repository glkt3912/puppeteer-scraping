import ISiteScraper from './ISiteScraper.js';
import puppeteer from 'puppeteer';
import CpuPage from '../pageObjects/CpuPage.js';

const url = process.env.CPU_SCRAPING_URL;

export default class CpuScraper extends ISiteScraper {
  async scrape(url) {
    const browser = await puppeteer.launch({ headless: "new"});
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (['stylesheet', 'font'].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });
    await page.goto(url);

    const cpuPage = new CpuPage(page);
    const data = await cpuPage.getCpuData();

    await browser.close();
    console.log(data);
    return data;
  }
}
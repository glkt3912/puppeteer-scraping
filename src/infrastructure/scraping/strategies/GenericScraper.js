import puppeteer from 'puppeteer';
import ISiteScraper from './ISiteScraper.js';

export default class GenericScraper extends ISiteScraper {
  constructor(pageObjectClass) {
    super();
    this.pageObjectClass = pageObjectClass;
  }

  async scrape(url) {
    if (!url || typeof url !== 'string') {
      throw new Error(`Invalid URL: ${url}`);
    }

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['stylesheet', 'font', 'script'].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
      // 補足情報が含まれる要素がページに確実に存在することを確認
    } catch (error) {
      console.error('ページのロードに失敗しました:', error);
      await browser.close();
      return null;
    }

    const pageObject = new this.pageObjectClass(page);
    let data;
    try {
      data = await pageObject.getData(); // CpuPageやGpuPageにはgetDataメソッドを実装
      console.log(`スクレイピングしたパーツ: ${data ? data.length : 0}件`);
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    }

    await browser.close();
    return data;
  }
}

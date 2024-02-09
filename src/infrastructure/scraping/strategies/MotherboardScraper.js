import ISiteScraper from './ISiteScraper.js';
import puppeteer from 'puppeteer';
import MotherboardPage from '../pageObjects/MotherboardPage.js';

export default class MotherboardScraper extends ISiteScraper {
  async scrape(url) {
    if (!url || typeof url !== 'string') {
      throw new Error(`Invalid URL: ${url}`);
    }
    let data;
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
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
      // 補足情報が含まれる要素がページに確実に存在することを確認
      await page.waitForTimeout(1000);
    } catch (error) {
      console.error('ページのロードに失敗しました:', error);
    }

    console.log('page catch');
    try {
      const motherboardPage = new MotherboardPage(page);
      data = await motherboardPage.getMotherboardData();
      console.log(data);
      if (data && data.length > 0) {
        console.log(`スクレイピングしたパーツ: ${data.length}件`);
        // パーツごとの処理をここに追加
      } else {
        console.log('スクレイピングしたパーツはありません。');
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }

    await browser.close();
    console.log(data);
    return data;
  }
}

<<<<<<< HEAD
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
=======
import puppeteer from "puppeteer";

// Unhandled promise rejection
process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

(async () => {
    const browser = await puppeteer.launch({ 
      headless: "new", // 最新版のchroinumの更新によりヘッドレス時の記述が変更のため、new
      slowMo: 50 //指定のミリ秒スローモーションで実行
    });
    // 新規の空ページ
    const page = await browser.newPage();
    // view portの設定
    // await page.setViewport({ width: 1200, height: 800 });

    await page.setRequestInterception(true);
    page.on('request', request => {
      if (['stylesheet', 'font'].includes(request.resourceType())) { // 負荷の大きいCSSとFontを除外、imageを除くのもあり
        request.abort();
      } else {
        request.continue();
      }
    });
  
    try {
      await page.goto('https://kakaku.com/pc/gaming-pc/itemlist.aspx', { waitUntil: 'domcontentloaded',timeout: 60000 });
    } catch (error) {
        console.error('ページのロードに失敗しました:', error);
    }

    await page.waitForTimeout(1000);

    const pageDom = await page.evaluate(() => {
      const elements = document.querySelectorAll(".ckitemLink");
      return Array.from(elements).map(element => element.textContent.trim());
    });
    console.log(pageDom);
  
    await browser.close();
  })();
>>>>>>> ddd

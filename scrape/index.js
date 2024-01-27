import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ headless: "new"}); // 最新版のchroinumの更新によりヘッドレスの記述が変更のため、new
    const page = await browser.newPage();

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
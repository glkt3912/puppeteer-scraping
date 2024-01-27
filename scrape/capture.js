import puppeteer from "puppeteer";

async function caputureScpape() {
    const browser = await puppeteer.launch({
        headless: "new",
        slowMo : 50,
    });

    const page = await browser.newPage()
    await page.setViewport({
        width: 1200,
        height: 800,
    });

    await page.goto('https://www.shuwasystem.co.jp/');

    await page.waitForSelector('#newsBlock');
    const newsBlock = await page.evaluate((selector) => {
        return document.querySelector(selector).innerHTML;
    }, '#newsBlock');
    console.log(newsBlock);
    await browser.close();
}

caputureScpape();
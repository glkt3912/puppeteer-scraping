import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

async function waitnavSample() {
    const browser = await puppeteer.launch({
        headless: "new",
        slowMo : 50,
    });

    const page = await browser.newPage()
    await page.setViewport({
        width: 1200,
        height: 800,
    });

    console.log('goto');
    await page.goto('http://www.livedoor.com/');

    console.log('wait and click');
    await Promise.all([
    page.waitForNavigation({ waitUntil: 'load'}),
    // リンクをクリックする
    page.click('#newstopicsbox li:nth-child(1) a'),
    ]);

    console.log('evaluate');
    const h2Title = await page.evaluate(() => document.querySelector('h1.topicsTtl').textContent);
    console.log(`遷移先newsタイトル：${h2Title}`);
    await browser.close();
}

waitnavSample();
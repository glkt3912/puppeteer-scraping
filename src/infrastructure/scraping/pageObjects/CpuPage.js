import puppeteer from "puppeteer";

class CpuPage {
  constructor(page) {
    this.page = page;
  }

  async getCpuData() {
    this.page.on('console', message => {
      console.log(`ブラウザコンソール: ${message.text()}`);
    });

    return this.page.evaluate(() => {
      const nodeList = document.querySelectorAll('.rkgBox.noGraph');
      console.log(nodeList);
      const items = Array.from(nodeList).map(node => { // 商品名と価格を取得
        console.log(node);
        const text = node.textContent;
        
        // 抽出
        const nameMatch = text.match(/メーカー：(AMD|インテル)\n?(.+?)\n/);
        let name = nameMatch ? nameMatch[1] : null;
        name = name === 'インテル' ? 'Intel' : name;
        const priceMatch = text.match(/最安値([¥\d,]+)/);
        const price = priceMatch ? priceMatch[1] : null;
        const releaseDateMatch = text.match(/発売日：(\d{4}年\d{1,2}月\d{1,2}日)/);
        const releaseDate = releaseDateMatch ? releaseDateMatch[1] : null;
        const processorMatch = text.match(/プロセッサ名：(.+?)(?= 世代：|$)/);
        const processor = processorMatch ? processorMatch[1] : null;
        const generationMatch = text.match(/世代：(.+?)(?= クロック周波数：|$)/);
        const generation = generationMatch ? generationMatch[1] : null;
        const frequencyMatch = text.match(/クロック周波数：(.+?)(?= ソケット形状：|$)/);
        const frequency = frequencyMatch ? frequencyMatch[1] : null;
        const socketMatch = text.match(/ソケット形状：(.+?)(?= 二次キャッシュ：|$)/);
        const socket = socketMatch ? socketMatch[1] : null;
        const cacheMatch = text.match(/二次キャッシュ：(.+?)(?=\n|$)/);
        const cache = cacheMatch ? cacheMatch[1] : null;
        // 画像URLの抽出
        const imgSrc = node.querySelector('.rkgItemImg img') ? node.querySelector('.rkgItemImg img').src : null;

        return { name, price, releaseDate, processor, generation, frequency, socket, cache, imgSrc };
      });
      return items;
    });
  }
}

export default CpuPage;
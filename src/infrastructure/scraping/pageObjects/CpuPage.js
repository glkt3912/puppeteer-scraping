export default class CpuPage {
  constructor(page) {
    this.page = page;
  }

  async getData() {
    this.page.on('console', (message) => {
      console.log(`ブラウザコンソール: ${message.text()}`);
    });

    return this.page.evaluate(() => {
      function extractTextByRegex(text, regex, groupIndex = 1) {
        const match = text.match(regex);
        if (match && match.length > groupIndex) {
          return match[groupIndex].trim();
        } else {
          return null;
        }
      }
      const nodeList = document.querySelectorAll('.rkgBox.noGraph');
      const items = Array.from(nodeList).map((node) => {
        const text = node.textContent;
        const name = extractTextByRegex(text, /プロセッサ名：(.+?)(?= 世代：|$)/);
        const brandMatch = text.match(/メーカー：(AMD|インテル)\n?(.+?)\n/);
        let brand = brandMatch ? brandMatch[1] : null;
        brand = brand === 'インテル' ? 'Intel' : brand;
        const releaseDate = extractTextByRegex(text, /発売日：(\d{4}年(?:\s*\d{1,2}月(?:\s*(?:上旬|中旬|下旬)|\s*\d{1,2}日)?)?)(?=\s*メーカー)/);
        const price = extractTextByRegex(text, /最安値([\s*¥\d,]+)/);
        const generation = extractTextByRegex(text, /世代：(.+?)(?= クロック周波数：|$)/);
        const frequency = extractTextByRegex(text, /クロック周波数：(.+?)(?= ソケット形状：|$)/);
        const socket = extractTextByRegex(text, /ソケット形状：(.+?)(?= 二次キャッシュ：|$)/);
        const cache = extractTextByRegex(text, /二次キャッシュ：(.+?)(?=\n|$)/);
        // 画像URLの抽出
        const imgSrc = node.querySelector('.rkgItemImg img')
          ? node.querySelector('.rkgItemImg img').src
          : null;
        // // 補足情報を取得
        // const detailListElements = node.querySelectorAll('.rkgDetailList li');
        // const detailList = detailListElements.length > 0 ? Array.from(detailListElements).map(li => li.textContent.trim()) : [];

        return {
          name,
          brand,
          price,
          releaseDate,
          generation,
          frequency,
          socket,
          cache,
          imgSrc,
        };
      });
      return items;
    });
  }
}

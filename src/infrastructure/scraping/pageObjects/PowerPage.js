export default class PowerPage {
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
        const name = node.querySelector('.rkgBoxNameItem').textContent;
        const brand = extractTextByRegex(text, /メーカー：\n*(.+?)\n/);
        let releaseDate = '';
        const releaseDateMatch = extractTextByRegex(
          text,
          /発売日：(\d{4}年(?:\s*\d{1,2}月(?:\s*(?:上旬|中旬|下旬)|\s*\d{1,2}日)?)?)(?=\s*メーカー)/,
        );
        const registrationDateMatch = extractTextByRegex(
          text,
          /登録日：(\d{4}年(?:\s*\d{1,2}月(?:\s*(?:上旬|中旬|下旬)|\s*\d{1,2}日)?)?)(?=\s*メーカー)/,
        );
        releaseDate = registrationDateMatch ?? releaseDateMatch;
        const price = extractTextByRegex(text, /最安値([\s*¥\d,]+)/);
        const formFactor = extractTextByRegex(
          text,
          /対応規格：(.+?)(?= 電源容量：|$)/,
        );
        const capacity = extractTextByRegex(
          text,
          /電源容量：(.+?)(?= 80PLUS認証：|$)/,
        );
        const certfication = extractTextByRegex(
          text,
          /80PLUS認証：(.+?)(?= サイズ：|$)/,
        );
        const size = extractTextByRegex(text, /サイズ：(.+?)(?= 重量：|$)/);
        const weight = extractTextByRegex(text, /重量：(.+?)(?=\n|$)/);
        const imgSrc = node.querySelector('.rkgItemImg img')
          ? node.querySelector('.rkgItemImg img').src
          : null;
        // // 補足情報を取得
        // const detailListElements = node.querySelectorAll('.rkgDetailList li');
        // const detailList = detailListElements.length > 0 ? Array.from(detailListElements).map(li => li.textContent.trim()) : [];

        return {
          name,
          brand,
          releaseDate,
          price,
          formFactor,
          capacity,
          certfication,
          size,
          weight,
          imgSrc,
        };
      });
      return items;
    });
  }
}

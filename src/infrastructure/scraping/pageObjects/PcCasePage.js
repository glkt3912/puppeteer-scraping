export default class PcCasePage {
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
          /対応マザーボード：(.+?)(?= 幅x高さx奥行：|$)/,
        );
        const size = extractTextByRegex(
          text,
          /幅x高さx奥行：(.+?)(?= 3.5インチベイ：|$)/,
        );
        const mountingBracket35 = extractTextByRegex(
          text,
          /3.5インチベイ：(.+?)(?= 3.5インチシャドウベイ：|$)/,
        );
        const mountingBracket35shadow = extractTextByRegex(
          text,
          /3.5インチシャドウベイ：(.+?)(?= 5.25インチベイ：|$)/,
        );
        const mountingBracket525 = extractTextByRegex(
          text,
          /5.25インチベイ：(.+?)(?=\n|$)/,
        );

        // 画像URLの抽出
        const imgSrc = node.querySelector('.rkgItemImg img')
          ? node.querySelector('.rkgItemImg img').src
          : null;
        return {
          name,
          brand,
          price,
          releaseDate,
          formFactor,
          size,
          mountingBracket35,
          mountingBracket35shadow,
          mountingBracket525,
          imgSrc,
        };
      });
      return items;
    });
  }
}

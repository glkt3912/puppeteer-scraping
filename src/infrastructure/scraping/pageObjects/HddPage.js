export default class HddPage {
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
        const capacity = extractTextByRegex(text, /容量：(.+?)(?= 回転数：|$)/);
        const rpm = extractTextByRegex(
          text,
          /回転数：(.+?)(?= キャッシュ：|$)/,
        );
        const interfaceSpec = extractTextByRegex(
          text,
          /インターフェイス：(.+?)(?= 書き込み方式：|$)/,
        );
        const magneticRecordingType = extractTextByRegex(
          text,
          /書き込み方式：(.+?)(?=\n|$)/,
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
          capacity,
          rpm,
          interfaceSpec,
          magneticRecordingType,
          imgSrc,
        };
      });
      return items;
    });
  }
}

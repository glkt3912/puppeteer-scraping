export default class SsdPage {
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
        const releaseDate = extractTextByRegex(
          text,
          /発売日：(\d{4}年(?:\s*\d{1,2}月(?:\s*(?:上旬|中旬|下旬)|\s*\d{1,2}日)?)?)(?=\s*メーカー)/,
        );
        const price = extractTextByRegex(text, /最安値([\s*¥\d,]+)/);
        const capacity = extractTextByRegex(
          text,
          /容量：(.+?)(?= 規格サイズ：|$)/,
        );
        const standard = extractTextByRegex(
          text,
          /規格サイズ：(.+?)(?= インターフェイス：|$)/,
        );
        const interfaceSpec = extractTextByRegex(
          text,
          /インターフェイス：(.+?)(?= タイプ：|$)/,
        );
        const type = extractTextByRegex(text, /タイプ：(.+?)(?= 読込速度：|$)/); // 補足：NANDフラッシュメモリ（メモリセル）の形式
        const readSpeed = extractTextByRegex(
          text,
          /読込速度：(.+?)(?= 書込速度：|$)/,
        );
        const writeSpeed = extractTextByRegex(text, /書込速度：(.+?)(?=\n|$)/);

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
          standard,
          interfaceSpec,
          type,
          readSpeed,
          writeSpeed,
          imgSrc,
        };
      });
      return items;
    });
  }
}

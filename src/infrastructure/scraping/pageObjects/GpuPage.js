export default class GpuPage {
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
        const releaseDate = extractTextByRegex(text, /発売日：(\d{4}年(?:\s*\d{1,2}月(?:\s*(?:上旬|中旬|下旬)|\s*\d{1,2}日)?)?)(?=\s*メーカー)/);
        const price = extractTextByRegex(text, /最安値([\s*¥\d,]+)/);
        const chipset = extractTextByRegex(
          text,
          /搭載チップ：(.+?)(?= バスインターフェイス：|$)/,
        );
        const busInterface = extractTextByRegex(
          text,
          /バスインターフェイス：(.+?)(?= モニタ端子：|$)/,
        );
        const displayInput = extractTextByRegex(
          text,
          /モニタ端子：(.+?)(?= メモリ：|$)/,
        );
        const memory = extractTextByRegex(
          text,
          /メモリ：(.+?)(?= 消費電力：|$)/,
        );
        const wattage = extractTextByRegex(text, /消費電力：(.+?)(?=\n|$)/);
        // 画像URLの抽出
        const imgSrc = node.querySelector('.rkgItemImg img')
          ? node.querySelector('.rkgItemImg img').src
          : null;
        return {
          name,
          brand,
          price,
          releaseDate,
          chipset,
          busInterface,
          displayInput,
          memory,
          wattage,
          imgSrc,
        };
      });
      return items;
    });
  }
}

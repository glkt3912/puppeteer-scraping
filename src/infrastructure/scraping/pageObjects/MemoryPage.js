export default class MemoryPage {
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
        const capacity = extractTextByRegex(text, /メモリ容量(1枚あたり)：(.+?)(?= 枚数：|$)/);
        const count = extractTextByRegex(text, /枚数：(.+?)(?= メモリ規格：|$)/);
        const memoryStandard = extractTextByRegex(text, /メモリ規格：(.+?)(?= メモリインターフェイス：|$)/);
        const memoryInterface = extractTextByRegex(text, /メモリインターフェイス：(.+?)(?= モジュール規格：|$)/);
        const moduleStandard = extractTextByRegex(text, /モジュール規格：(.+?)(?=\n|$)/);

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
          count,
          memoryStandard,
          memoryInterface,
          moduleStandard,
          imgSrc
        };
      });
      return items;
    });
  }
}

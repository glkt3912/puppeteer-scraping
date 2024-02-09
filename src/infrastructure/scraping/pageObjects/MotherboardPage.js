class MotherboardPage {
  constructor(page) {
    this.page = page;
  }

  async getMotherboardData() {
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
        const releaseDate = extractTextByRegex(text, /発売日：(\d{4}年\d{1,2}月\d{1,2}日)/);
        const price = extractTextByRegex(text, /最安値([\s*¥\d,]+)/);
        const formFactor = extractTextByRegex(text, /フォームファクタ：(.+?)(?= CPUソケット：|$)/);
        const socket = extractTextByRegex(text, /CPUソケット：(.+?)(?= チップセット：|$)/);
        const chipset = extractTextByRegex(text, /チップセット：(.+?)(?= メモリタイプ：|$)/);
        const mempryType = extractTextByRegex(text, /メモリタイプ：(.+?)(?=\n|$)/)
        const imgSrc = node.querySelector('.rkgItemImg img')
        ? node.querySelector('.rkgItemImg img').src
        : null;
        // // 補足情報を取得
        // const detailListElements = node.querySelectorAll('.rkgDetailList li');
        // const detailList = detailListElements.length > 0 ? Array.from(detailListElements).map(li => li.textContent.trim()) : [];

        return {
          name, brand, releaseDate, price, formFactor, socket, chipset, mempryType, imgSrc
        };
      });
      return items;
    });
  }
}

export default MotherboardPage;

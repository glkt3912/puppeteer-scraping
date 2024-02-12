export default class DisplayPage {
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
        const size = extractTextByRegex(
          text,
          /モニタサイズ：(.+?)(?= モニタタイプ：|$)/,
        );
        const displayType = extractTextByRegex(
          text,
          /モニタタイプ：(.+?)(?= 解像度（規格）：|$)/,
        );
        const resolution = extractTextByRegex(
          text,
          /解像度（規格）：(.+?)(?= 入力端子：|$)/,
        );
        const displayInput = extractTextByRegex(
          text,
          /入力端子：(.+?)(?= パネル種類：|$)/,
        );
        const panelType = extractTextByRegex(
          text,
          /パネル種類：(.+?)(?= リフレッシュレート\(垂直走査周波数\)：|$)/,
        );
        const refreshRate = extractTextByRegex(
          text,
          /リフレッシュレート\(垂直走査周波数\)：(.+?)(?=\n|$)/,
        );
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
          size,
          displayType,
          resolution,
          displayInput,
          panelType,
          refreshRate,
          imgSrc,
        };
      });
      return items;
    });
  }
}

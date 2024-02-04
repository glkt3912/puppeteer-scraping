class GpuPage {
    constructor(page) {
      this.page = page;
    }
  
    async getGpuData() {
      this.page.on('console', message => {
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
        console.log(nodeList);
        const items = Array.from(nodeList).map(node => {
            const text = node.textContent;
            const name = extractTextByRegex(text, /^(.*)(?= \[PCIExp\s\d+GB\]$)/ );
            const maker = extractTextByRegex(text, /メーカー：\n*(.+?)\n/);
            const price = extractTextByRegex(text, /最安値([\s*¥\d,]+)/ );
            const chipset = extractTextByRegex(text, /搭載チップ：(.+?)(?= バスインターフェイス：|$)/ );
            const busInterface = extractTextByRegex(text, /バスインターフェイス：(.+?)(?= モニタ端子：|$)/ );
            const displayInput = extractTextByRegex(text, /モニタ端子：(.+?)(?= メモリ：|$)/ );
            const memory = extractTextByRegex(text, /メモリ：(.+?)(?= 消費電力：|$)/ );
            const wattage = extractTextByRegex(text, /消費電力：(.+?)(?=\n|$)/ );
            // 画像URLの抽出
            const imgSrc = node.querySelector('.rkgItemImg img') ? node.querySelector('.rkgItemImg img').src : null;
            return { name, maker, price, chipset, busInterface, displayInput, memory, wattage, imgSrc};
            });
        return items;
        });
    }
  }
  
  export default GpuPage;
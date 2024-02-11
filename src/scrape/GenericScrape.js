import GenericScrapingService from '../application/services/GenericScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import scrapingUrls from '../infrastructure/config/scrapingUrls.js';

const partType = process.argv[2];

if (!partType || !scrapingUrls[partType]) {
    console.error('指定されたパーツタイプのURLが設定ファイルに存在しません。');
    process.exit(1);
  }

const pageObjectMapping = {
  cpu: '../infrastructure/scraping/pageObjects/CpuPage.js',
  gpu: '../infrastructure/scraping/pageObjects/GpuPage.js',
  motherboard: '../infrastructure/scraping/pageObjects/MotherboardPage.js',
  power: '../infrastructure/scraping/pageObjects/PowerPage.js',
  memory: '../infrastructure/scraping/pageObjects/MemoryPage.js',
  hdd: '../infrastructure/scraping/pageObjects/HddPage.js',
  ssd: '../infrastructure/scraping/pageObjects/SsdPage.js',
  cooler: '../infrastructure/scraping/pageObjects/CoolerPage.js',
  pccase: '../infrastructure/scraping/pageObjects/PcCasePage.js',
  display: '../infrastructure/scraping/pageObjects/DisplayPage.js',
};
const url = scrapingUrls[partType];

// 対応するページオブジェクトを動的にインポート
import(pageObjectMapping[partType]).then(({ default: PageObject }) => {
  const scrapingService = new GenericScrapingService(GenericScraper, PageObject);
  scrapingService.scrapeParts(url)
    .then(parts => console.log(`スクレイピングした${partType}パーツ:`, parts))
    .catch(error => console.error(`${partType}スクレイピングエラー:`, error));
});
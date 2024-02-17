import GenericScrapingService from '../application/services/GenericScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import scrapingUrls from '../infrastructure/config/scrapingUrls.js';
import pageObjectMapping from '../infrastructure/config/pageObjectMapping.js';

const partType = process.argv[2];

if (!partType || !scrapingUrls[partType]) {
  console.error('指定されたパーツタイプのURLが設定ファイルに存在しません。');
  process.exit(1);
}
const url = scrapingUrls[partType];

// 対応するページオブジェクトを動的にインポート
import(pageObjectMapping[partType]).then(({ default: PageObject }) => {
  const scrapingService = new GenericScrapingService(
    new GenericScraper(PageObject),
  );
  scrapingService
    .scrapeParts(url)
    .then((parts) => console.log(`スクレイピングした${partType}パーツ:`, parts))
    .catch((error) => console.error(`${partType}スクレイピングエラー:`, error));
});

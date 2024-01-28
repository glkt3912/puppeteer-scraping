import PcPartsScrapingService from './PcPartsScrapingService.js';
import ExampleSiteScraper from './ExampleSiteScraper.js';

const exampleSiteScraper = new ExampleSiteScraper();
const scrapingService = new PcPartsScrapingService(exampleSiteScraper);

scrapingService.scrapeParts('https://example.com/pc-parts')
  .then(parts => {
    // 処理
  })
  .catch(error => {
    console.error('エラー:', error);
  });
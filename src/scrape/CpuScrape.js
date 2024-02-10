import CpuScrapingService from '../application/services/CpuScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import CpuPage from '../infrastructure/scraping/pageObjects/CpuPage.js';

const cpuScraper = new GenericScraper(CpuPage);
const scrapingService = new CpuScrapingService(cpuScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

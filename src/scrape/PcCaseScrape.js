import PcCaseScrapingService from '../application/services/PcCaseScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import PcCasePage from '../infrastructure/scraping/pageObjects/PcCasePage.js';

const PcCaseScraper = new GenericScraper(PcCasePage);
const scrapingService = new PcCaseScrapingService(PcCaseScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

import PowerScrapingService from '../application/services/PowerScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import PowerPage from '../infrastructure/scraping/pageObjects/PowerPage.js';

const powerScraper = new GenericScraper(PowerPage);
const scrapingService = new PowerScrapingService(powerScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

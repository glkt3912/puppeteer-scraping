import HddScrapingService from '../application/services/HddScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import HddPage from '../infrastructure/scraping/pageObjects/HddPage.js';

const hddScraper = new GenericScraper(HddPage);
const scrapingService = new HddScrapingService(hddScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

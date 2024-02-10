import SsdScrapingService from '../application/services/SsdScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import SsdPage from '../infrastructure/scraping/pageObjects/SsdPage.js';

const ssdScraper = new GenericScraper(SsdPage);
const scrapingService = new SsdScrapingService(ssdScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

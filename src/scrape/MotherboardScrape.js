import MotherboardScrapingService from '../application/services/MotherboardScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import MotherboardPage from '../infrastructure/scraping/pageObjects/MotherboardPage.js';

const motherboardScraper = new GenericScraper(MotherboardPage);
const scrapingService = new MotherboardScrapingService(motherboardScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

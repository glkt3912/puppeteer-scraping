import DisplayScrapingService from '../application/services/DisplayScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import DisplayPage from '../infrastructure/scraping/pageObjects/DisplayPage.js';

const displayScraper = new GenericScraper(DisplayPage);
const scrapingService = new DisplayScrapingService(displayScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

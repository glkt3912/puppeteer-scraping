import HhdScrapingService from '../application/services/HddScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import HhdPage from '../infrastructure/scraping/pageObjects/HddPage.js';

const hhdScraper = new GenericScraper(HhdPage);
const scrapingService = new HhdScrapingService(hhdScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

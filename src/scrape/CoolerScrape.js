import CoolerScrapingService from '../application/services/CoolerScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import CoolerPage from '../infrastructure/scraping/pageObjects/CoolerPage.js';

const coolerScraper = new GenericScraper(CoolerPage);
const scrapingService = new CoolerScrapingService(coolerScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

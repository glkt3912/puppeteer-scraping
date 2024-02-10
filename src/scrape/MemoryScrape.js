import MemoryScrapingService from '../application/services/MemoryScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import MemoryPage from '../infrastructure/scraping/pageObjects/MemoryPage.js';

const memoryScraper = new GenericScraper(MemoryPage);
const scrapingService = new MemoryScrapingService(memoryScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

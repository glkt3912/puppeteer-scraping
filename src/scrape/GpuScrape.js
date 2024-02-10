import GpuScrapingService from '../application/services/GpuScrapingService.js';
import GenericScraper from '../infrastructure/scraping/strategies/GenericScraper.js';
import GpuPage from '../infrastructure/scraping/pageObjects/GpuPage.js';

const gpuScraper = new GenericScraper(GpuPage);
const scrapingService = new GpuScrapingService(gpuScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

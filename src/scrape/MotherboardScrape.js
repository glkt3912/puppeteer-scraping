import MotherboardScrapingService from '../application/services/MotherboardScrapingService.js';
import MotherboardScraper from '../infrastructure/scraping/strategies/MotherboardScraper.js';
// dotenvを動的にインポート
// import('dotenv/config');
// console.log(process.env.CPU_SCRAPING_URL);

const motherboardScraper = new MotherboardScraper();
const scrapingService = new MotherboardScrapingService(motherboardScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

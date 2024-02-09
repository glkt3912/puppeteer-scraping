import PowerScrapingService from '../application/services/PowerScrapingService.js';
import PowerScraper from '../infrastructure/scraping/strategies/PowerScraper.js';
// dotenvを動的にインポート
// import('dotenv/config');
// console.log(process.env.CPU_SCRAPING_URL);

const powerScraper = new PowerScraper();
const scrapingService = new PowerScrapingService(powerScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

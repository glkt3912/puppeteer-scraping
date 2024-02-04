import GpuScrapingService from '../application/services/GpuScrapingService.js';
import GpuScraper from '../infrastructure/scraping/strategies/GpuScraper.js';
// dotenvを動的にインポート
// import('dotenv/config');
// console.log(process.env.CPU_SCRAPING_URL);

const gpuScraper = new GpuScraper();
const scrapingService = new GpuScrapingService(gpuScraper);

scrapingService
  .scrapeParts()
  .then((parts) => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch((error) => {
    console.error('エラー:', error);
  });

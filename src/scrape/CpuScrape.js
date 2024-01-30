import CpuScrapingService from "../application/services/CpuScrapingService.js";
import CpuScraper from "../infrastructure/scraping/strategies/CpuScraper.js";
// dotenvを動的にインポート
// import('dotenv/config');
// console.log(process.env.CPU_SCRAPING_URL);

const cpuScraper = new CpuScraper();
const scrapingService = new CpuScrapingService(cpuScraper);

scrapingService.scrapeParts()
  .then(parts => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch(error => {
    console.error('エラー:', error);
  });
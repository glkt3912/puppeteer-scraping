import CpuScrapingService from "../application/services/CpuScrapingService";
import CpuScraper from "../infrastructure/scraping/strategies/CpuScraper";

const cpuScraper = new CpuScraper();
const scrapingService = new CpuScrapingService(cpuScraper);

scrapingService.scrapeParts()
  .then(parts => {
    console.log('スクレイピングしたパーツ:', parts);
  })
  .catch(error => {
    console.error('エラー:', error);
  });
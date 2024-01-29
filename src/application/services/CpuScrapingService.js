// import CpuPart from '../domain/entities/CpuPart.js';
require('dotenv').config();

class CpuScrapingService {
  constructor(siteScraper) {
    this.siteScraper = siteScraper;
    this.url = process.env.CPU_SCRAPING_URL;
  }

  async scrapeParts() {
    const rawData = await this.siteScraper.scrape(this.url);
    return rawData.map(data => new data);
  }
}

export default CpuScrapingService;
import CpuPart from '../../domain/entities/CpuPart.js';

class CpuScrapingService {
  constructor(siteScraper) {
    this.siteScraper = siteScraper;
    this.url = "https://kakaku.com/pc/cpu/ranking_0510/hot/";
  }

  async scrapeParts() {
    const rawData = await this.siteScraper.scrape(this.url);
    console.log(rawData);
    // return rawData.map(data => new CpuPart(data));
    // try {
    //   const rawData = await this.siteScraper.scrape(this.url);
    //   if (Array.isArray(rawData)) {
    //     console.log(rawData);
    //     return rawData.map(data => new CpuPart(data));
    //   } else {
    //     throw new Error('Invalid data format received from scraping.');
    //   }
    // } catch (error) {
    //   throw error;
    // }
  }
}

export default CpuScrapingService;
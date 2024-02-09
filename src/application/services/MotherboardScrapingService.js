// import MotherboardPart from '../../domain/entities/MotherboardPart.js';

class MotherboardScrapingService {
  constructor(siteScraper) {
    this.siteScraper = siteScraper;
    this.url = 'https://kakaku.com/pc/motherboard/ranking_0540/';
  }

  async scrapeParts() {
    const rawData = await this.siteScraper.scrape(this.url);
    console.log(rawData);
    // return rawData.map(data => new MotherboardPart(data));
    // try {
    //   const rawData = await this.siteScraper.scrape(this.url);
    //   if (Array.isArray(rawData)) {
    //     console.log(rawData);
    //     return rawData.map(data => new MotherboardPart(data));
    //   } else {
    //     throw new Error('Invalid data format received from scraping.');
    //   }
    // } catch (error) {
    //   throw error;
    // }
  }
}

export default MotherboardScrapingService;
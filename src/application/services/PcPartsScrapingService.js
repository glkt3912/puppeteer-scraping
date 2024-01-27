import PcPart from '../domain/entities/PcPart.js';

class PcPartsScrapingService {
  constructor(siteScraper) {
    this.siteScraper = siteScraper;
  }

  async scrapeParts(url) {
    const rawData = await this.siteScraper.scrape(url);
    return rawData.map(data => new PcPart(data));
  }
}

export default PcPartsScrapingService;
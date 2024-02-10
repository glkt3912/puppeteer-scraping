class MemoryScrapingService {
  constructor(siteScraper) {
    this.siteScraper = siteScraper;
    this.url = 'https://kakaku.com/pc/pc-memory/ranking_0520/';
  }

  async scrapeParts() {
    const rawData = await this.siteScraper.scrape(this.url);
    console.log(rawData);
    // return rawData.map(data => new MemoryPart(data));
    // try {
    //   const rawData = await this.siteScraper.scrape(this.url);
    //   if (Array.isArray(rawData)) {
    //     console.log(rawData);
    //     return rawData.map(data => new MemoryPart(data));
    //   } else {
    //     throw new Error('Invalid data format received from scraping.');
    //   }
    // } catch (error) {
    //   throw error;
    // }
  }
}

export default MemoryScrapingService;

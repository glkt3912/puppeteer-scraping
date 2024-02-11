export default class GenericScrapingService {
    constructor(scraper, pageObjectClass) {
      this.scraper = new scraper(pageObjectClass);
    }
  
    async scrapeParts(url) {
      return await this.scraper.scrape(url);
    }
  }
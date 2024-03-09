class ScrapingService {
  constructor(scraper, transformer) {
    this.scraper = scraper;
    this.transformer = transformer;
  }

  async scrapeAndTransform(url) {
    const rawData = await this.scraper.scrape(url);
    return this.transformer.transform(rawData);
  }
}

export default class GenericScrapingService {
  constructor(scraper, transformer = null, repository = null) {
    this.scraper = scraper;
    this.transformer = transformer;
    this.repository = repository;
  }

  async scrapeParts(url) {
    return await this.scraper.scrape(url);
  }

  async scrapeAndSave(url) {
    if (!this.transformer || !this.repository) {
      throw new Error('It seems like "Transformer" or "Repository" is not configured.');
    }
    // スクレイピングでデータを取得
    const scrapedData = await this.scraper.scrape(url);

    // 取得したデータを変換
    let transformedData = await this.transformer.transform(scrapedData);
    const savedItems = [];
    for (const item of transformedData) {
      if (item) {
        const savedItem = await this.repository.createOrUpdate(item);
        savedItems.push(savedItem);
      }
    }

    console.log(savedItems);
    return savedItems;
  }
}
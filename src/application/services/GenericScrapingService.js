export default class GenericScrapingService {
  constructor(scraper, pageObjectClass, transformer = null, repository = null) {
    this.scraper = new scraper(pageObjectClass);
    this.transformer = transformer;
    this.repository = repository;
  }

  async scrapeParts(url) {
    return await this.scraper.scrape(url);
  }

  async scrapeAndSave(url) {
    if (!this.transformer || !this.repository) {
      throw new Error('TransformerまたはRepositoryが設定されていません。');
    }
    // スクレイピングでデータを取得
    const scrapedData = await this.scraper.scrape(url);
    // 取得したデータを変換
    const transformedData = this.transformer.transform(scrapedData);
    // 変換したデータをデータベースに保存
    await this.repository.create(transformedData);
    return transformedData;
  }
}

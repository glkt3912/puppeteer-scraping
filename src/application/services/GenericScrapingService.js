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
    const transformedDataList = [];

    for (const data of scrapedData) {
      // 取得したデータを変換
      let transformedData = await this.transformer.transform(data);
      if (!Array.isArray(transformedData)) {
        transformedData = [transformedData];
      }

      for (const item of transformedData) {
        const savedItem = await this.repository.createOrUpdate(item);
      }

      transformedDataList.push(...transformedData);
    }

    console.log(transformedDataList);
    return transformedDataList;
  }
}
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
      throw new Error('TransformerまたはRepositoryが設定されていません。');
    }
    // スクレイピングでデータを取得
    const scrapedData = await this.scraper.scrape(url);
    const transformedDataList = [];
    console.log("スクレイピングしたデータ:", scrapedData);
    // 変換したデータをデータベースに保存
    for (const data of scrapedData) {
      // 取得したデータを変換
      const transformedData = await this.transformer.transform(data);
      console.log("変換後のデータ:", transformedData); // デバッグ用ログ
      console.log(transformedData);
      // if (!Array.isArray(transformedData)) {
      //   transformedData = [transformedData];
      // }
      await this.repository.createOrUpdate(transformedData);
      transformedDataList.push(transformedData);
    }
    console.log(transformedDataList);
    return transformedDataList;
  }
}

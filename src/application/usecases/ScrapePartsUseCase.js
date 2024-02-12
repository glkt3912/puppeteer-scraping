import GenericScrapingService from '../services/GenericScrapingService';
import GenericScraper from '../../infrastructure/scraping/strategies/GenericScraper';
import scrapingUrls from '../../infrastructure/config/scrapingUrls';
import pageObjectMapping from '../../infrastructure/config/pageObjectMapping';

export default class ScrapePartsUseCase {
  constructor(partType) {
    this.partType = partType;
    this.url = scrapingUrls[partType];
    this.pageObjectPath = pageObjectMapping[partType];
  }

  async execute() {
    if (!this.partType || !this.url) {
      throw new Error(
        '指定されたパーツタイプのURLが設定ファイルに存在しません。',
      );
    }

    const { default: PageObject } = await import(this.pageObjectPath);
    const scrapingService = new GenericScrapingService(
      GenericScraper,
      PageObject,
    );

    return scrapingService.scrapeParts(this.url);
  }
}

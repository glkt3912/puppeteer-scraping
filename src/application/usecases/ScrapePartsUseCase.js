import GenericScrapingService from '../services/GenericScrapingService';
import GenericScraper from '../../infrastructure/scraping/strategies/GenericScraper';
import scrapingUrls from '../../infrastructure/config/scrapingUrls';
import pageObjectMapping from '../../infrastructure/config/pageObjectMapping';
import {
  transformerMapping,
  repositoryMapping,
} from '../../infrastructure/config/componentMapping';

export default class ScrapePartsUseCase {
  constructor(partType) {
    this.partType = partType;
    this.url = scrapingUrls[partType];
    this.pageObjectPath = pageObjectMapping[partType];
    this.transformerPath = transformerMapping[partType];
    this.repositoryPath = repositoryMapping[partType];
  }

  async execute() {
    if (!this.partType || !this.url) {
      throw new Error(
        '指定されたパーツタイプのURLが設定ファイルに存在しません。',
      );
    }

    // ページオブジェクト、トランスフォーマー、リポジトリを動的にインポート
    const [
      { default: PageObject },
      { default: Transformer },
      { default: Repository },
    ] = await Promise.all([
      import(this.pageObjectPath),
      import(this.transformerPath),
      import(this.repositoryPath),
    ]);
    const scrapingService = new GenericScrapingService(
      GenericScraper,
      new PageObject(),
      new Transformer(),
      new Repository(),
    );

    return scrapingService.scrapeAndSave(this.url);
  }
}

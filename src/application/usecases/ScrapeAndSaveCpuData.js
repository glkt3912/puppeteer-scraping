import GenericScrapingService from '../services/GenericScrapingService.js';
import { CpuDataTransformer } from '../../domain/transformers/Transformers.js';
import CpuRepository from '../../infrastructure/repositories/CpuRepository.js';
import CpuPage from '../../infrastructure/scraping/pageObjects/CpuPage.js';
import GenericScraper from '../../infrastructure/scraping/strategies/GenericScraper.js';
import scrapingUrls from '../../infrastructure/config/scrapingUrls.js';

const partType = process.argv[2];

async function scrapeAndSaveCpuData() {
  if (!scrapingUrls[partType]) {
    console.error(`Error: URL for part type '${partType}' not found.`);
    return;
  }
  const url = scrapingUrls[partType];
  const transformer = new CpuDataTransformer();
  const repository = new CpuRepository();
  const scraper = new GenericScraper(CpuPage);
  const scrapingService = new GenericScrapingService(
    scraper,
    transformer,
    repository,
  );

  try {
    const result = await scrapingService.scrapeAndSave(url);
    console.log('CPU data scraped and saved successfully:', result);
  } catch (error) {
    console.error('Error scraping and saving CPU data:', error);
  }
}

scrapeAndSaveCpuData(partType);

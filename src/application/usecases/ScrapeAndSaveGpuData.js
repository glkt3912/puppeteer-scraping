import GenericScrapingService from '../services/GenericScrapingService.js';
import { GpuDataTransformer } from '../../domain/transformers/Transformers.js';
import GpuRepository from '../../infrastructure/repositories/GpuRepository.js';
import GpuPage from '../../infrastructure/scraping/pageObjects/GpuPage.js';
import GenericScraper from '../../infrastructure/scraping/strategies/GenericScraper.js';
import scrapingUrls from '../../infrastructure/config/scrapingUrls.js';

const partType = process.argv[2];

async function scrapeAndSaveGpuData() {
  if (!scrapingUrls[partType]) {
    console.error(`Error: URL for part type '${partType}' not found.`);
    return;
  }
  const url = scrapingUrls[partType];
  const transformer = new GpuDataTransformer();
  const repository = new GpuRepository();
  const scraper = new GenericScraper(GpuPage);
  const scrapingService = new GenericScrapingService(
    scraper,
    transformer,
    repository,
  );

  try {
    const result = await scrapingService.scrapeAndSave(url);
    console.log('GPU data scraped and saved successfully:', result);
  } catch (error) {
    console.error('Error scraping and saving GPU data:', error);
  }
}

scrapeAndSaveGpuData(partType);

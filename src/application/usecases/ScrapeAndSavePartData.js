import { scrapingConfig } from '../../infrastructure/config/scrapingConfig.js';
import GenericScrapingService from '../services/GenericScrapingService.js';
import GenericScraper from '../../infrastructure/scraping/strategies/GenericScraper.js';

const partType = process.argv[2];

async function scrapeAndSavePartData(partType) {
    const config = scrapingConfig[partType];
    if (!config) {
      console.error(`Error: Configuration for part type '${partType}' not found.`);
      return;
    }
  
    const { url, pageObject, transformer, repository } = config;
    const scraper = new GenericScraper(pageObject);
    const scrapingService = new GenericScrapingService(scraper, transformer, repository);
  
    try {
      const result = await scrapingService.scrapeAndSave(url);
      console.log(`${partType} data scraped and saved successfully:`, result);
    } catch (error) {
      console.error(`Error scraping and saving ${partType} data:`, error);
    }
  }
  
  scrapeAndSavePartData(partType);
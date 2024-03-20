import { GenericDataTransformer } from '../../domain/transformers/Transformers.js';
import CpuPage from '../scraping/pageObjects/CpuPage.js';
import GpuPage from '../scraping/pageObjects/GpuPage.js';
import CpuRepository from '../repositories/CpuRepository.js';
import GpuRepository from '../repositories/GpuRepository.js';

const scrapingConfig = {
    cpu: {
      url: 'https://kakaku.com/pc/cpu/ranking_0510/',
      pageObject: CpuPage,
      transformer: new GenericDataTransformer({
        requiredFields: ['name', 'brand', 'price', 'releaseDate'],
        fields: {
          name: { source: 'name' },
          brand: { source: 'brand' },
          price: { source: 'price', type: 'price' },
          releaseDate: { source: 'releaseDate', type: 'date' },
          generation: { source: 'generation' },
          frequency: { source: 'frequency' },
          socket: { source: 'socket' },
          cache: { source: 'cache' },
          image: { source: 'imgSrc', type: 'image' },
        },
        imageSaveDir: './images/cpu',
      }),
      repository: new CpuRepository(),
    },
    gpu: {
        url: 'https://kakaku.com/pc/videocard/ranking_0550/',
        pageObject: GpuPage,
        transformer: new GenericDataTransformer({
            requiredFields: ['name', 'brand', 'price', 'releaseDate'],
            fields: {
                name: { source: 'name' },
                brand: { source: 'brand' },
                price: { source: 'price', type: 'price' },
                releaseDate: { source: 'releaseDate', type: 'date' },
                chip: { source: 'chipset' },
                interface: { source: 'busInterface' },
                displayInput: { source: 'displayInput' },
                memory: { source: 'memory' },
                wattage: { source: 'wattage' },
                image: { source: 'imgSrc', type: 'image' },
            },
            imageSaveDir: './images/gpu',
        }),
        repository: new GpuRepository(),
    },
  };

  export default scrapingConfig;
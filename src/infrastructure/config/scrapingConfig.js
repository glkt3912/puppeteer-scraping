import { GenericDataTransformer } from '../../domain/transformers/GenericDataTransformer.js';
import CpuPage from '../scraping/pageObjects/CpuPage.js';
import GpuPage from '../scraping/pageObjects/GpuPage.js';
import MemoryPage from '../scraping/pageObjects/MemoryPage.js';
import CoolerPage from '../scraping/pageObjects/CoolerPage.js';
import CpuRepository from '../repositories/CpuRepository.js';
import GpuRepository from '../repositories/GpuRepository.js';
import MemoryRepository from '../repositories/MemoryRepository.js';
import CoolerRepository from '../repositories/CoolerRepository.js';


export const repositoryMap = {
  cpu: CpuRepository,
  gpu: GpuRepository,
  memory: MemoryRepository,
  cooler: CoolerRepository,
}

export const scrapingConfig = {
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
  memory: {
    url: 'https://kakaku.com/pc/pc-memory/ranking_0520/',
    pageObject: MemoryPage,
    transformer: new GenericDataTransformer({
        requiredFields: ['name', 'brand', 'price', 'releaseDate'],
        fields: {
            name: { source: 'name' },
            brand: { source: 'brand' },
            price: { source: 'price', type: 'price' },
            releaseDate: { source: 'releaseDate', type: 'date' },
            count: { source: 'count' },
            memoryStandard: { source: 'memoryStandard' },
            memoryInterface: { source: 'memoryInterface' },
            moduleStandard: { source: 'moduleStandard' },
            image: { source: 'imgSrc', type: 'image' },
        },
        imageSaveDir: './images/memory',
    }),
    repository: new MemoryRepository(),
  },
  cooler: {
    url: 'https://kakaku.com/pc/cpu-cooler/ranking_0512/',
    pageObject: CoolerPage,
    transformer: new GenericDataTransformer({
      requiredFields: ['name', 'brand', 'type'],
      fields: {
        name: { source: 'name' },
        brand: { source: 'brand' },
        price: { source: 'price', type: 'price' },
        releaseDate: { source: 'releaseDate', type: 'date' },
        type: { source: 'type' },
        size: { source: 'size' },
        tdp: { source: 'tdp' },
        noiseMaxLevel: { source: 'noiseMaxLevel' },
        image: { source: 'imgSrc', type: 'image' },
      },
      imageSaveDir: './images/cooler',
    }),
    repository: new CoolerRepository(),
  },
};
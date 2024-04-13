import { GenericDataTransformer } from '../../domain/transformers/GenericDataTransformer.js';
import CpuPage from '../scraping/pageObjects/CpuPage.js';
import GpuPage from '../scraping/pageObjects/GpuPage.js';
import MemoryPage from '../scraping/pageObjects/MemoryPage.js';
import CoolerPage from '../scraping/pageObjects/CoolerPage.js';
import DisplayPage from '../scraping/pageObjects/DisplayPage.js';
import PcCasePage from '../scraping/pageObjects/PcCasePage.js';
import PowerPage from '../scraping/pageObjects/PowerPage.js';
import HddPage from '../scraping/pageObjects/HddPage.js';
import SsdPage from '../scraping/pageObjects/SsdPage.js';
import MotherboardPage from '../scraping/pageObjects/MotherboardPage.js';
import CpuRepository from '../repositories/CpuRepository.js';
import GpuRepository from '../repositories/GpuRepository.js';
import MemoryRepository from '../repositories/MemoryRepository.js';
import CoolerRepository from '../repositories/CoolerRepository.js';
import DisplayRepository from '../repositories/DisplayRepository.js';
import PcCaseRepository from '../repositories/PcCaseRepository.js';
import PowerRepository from '../repositories/PowerRepository.js';
import HddRepository from '../repositories/HddRepository.js';
import SsdRepository from '../repositories/SsdRepository.js';
import MotherboardRepository from '../repositories/MotherboardRepository.js';

export const repositoryMap = {
  cpu: CpuRepository,
  gpu: GpuRepository,
  memory: MemoryRepository,
  cooler: CoolerRepository,
  display: DisplayRepository,
  pccase: PcCaseRepository,
  power: PowerRepository,
  hdd: HddRepository,
  ssd: SsdRepository,
  motherboard: MotherboardRepository,
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
      requiredFields: ['name', 'brand', 'price', 'releaseDate'],
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
  display: {
    url: 'https://kakaku.com/pc/gaming-monitor/ranking_V085/',
    pageObject: DisplayPage,
    transformer: new GenericDataTransformer({
      requiredFields: ['name', 'brand', 'price', 'releaseDate'],
      fields: {
        name: { source: 'name' },
        brand: { source: 'brand' },
        price: { source: 'price', type: 'price' },
        releaseDate: { source: 'releaseDate', type: 'date' },
        size: { source: 'size' },
        displayType: { source: 'displayType' },
        displayInput: { source: 'displayInput' },
        resolution: { source: 'resolution' },
        panelType: { source: 'panelType' },
        refreshRate: { source: 'refreshRate' },
        image: { source: 'imgSrc', type: 'image' },
      },
      imageSaveDir: './images/display',
    }),
    repository: new DisplayRepository(),
  },
  pccase: {
    url: 'https://kakaku.com/pc/pc-case/ranking_0580/',
    pageObject: PcCasePage,
    transformer: new GenericDataTransformer({
      requiredFields: ['name', 'brand', 'price', 'releaseDate'],
      fields: {
        name: { source: 'name' },
        brand: { source: 'brand' },
        price: { source: 'price', type: 'price' },
        releaseDate: { source: 'releaseDate', type: 'date' },
        formFactor: { source: 'formFactor' },
        size: { source: 'size' },
        mountingBracket35: { source: 'mountingBracket35' },
        mountingBracket35shadow: { source: 'mountingBracket35shadow' },
        mountingBracket525: { source: 'mountingBracket525' },
        image: { source: 'imgSrc', type: 'image' },
      },
      imageSaveDir: './images/pccase',
    }),
    repository: new PcCaseRepository(),
  },
  power: {
    url: 'https://kakaku.com/pc/power-supply/ranking_0590/',
    pageObject: PowerPage,
    transformer: new GenericDataTransformer({
      requiredFields: ['name', 'brand', 'price', 'releaseDate'],
      fields: {
        name: { source: 'name' },
        brand: { source: 'brand' },
        price: { source: 'price', type: 'price' },
        releaseDate: { source: 'releaseDate', type: 'date' },
        capacity: { source: 'capacity' },
        size: { source: 'size' },
        formFactor: { source: 'formFactor' },
        certfication: { source: 'certfication' },
        weight: { source: 'weight' },
        image: { source: 'imgSrc', type: 'image' },
      },
      imageSaveDir: './images/power',
    }),
    repository: new PowerRepository(),
  },
  motherboard: {
    url: 'https://kakaku.com/pc/motherboard/ranking_0540/',
    pageObject: MotherboardPage,
    transformer: new GenericDataTransformer({
      requiredFields: ['name', 'brand', 'price', 'releaseDate'],
      fields: {
        name: { source: 'name' },
        brand: { source: 'brand' },
        price: { source: 'price', type: 'price' },
        releaseDate: { source: 'releaseDate', type: 'date' },
        socket: { source: 'socket' },
        memoryType: { source: 'memoryType' },
        formFactor: { source: 'formFactor' },
        chipset: { source: 'chipset' },
        image: { source: 'imgSrc', type: 'image' },
      },
      imageSaveDir: './images/motherboard',
    }),
    repository: new MotherboardRepository(),
  },
  hdd: {
    url: 'https://kakaku.com/pc/hdd-35inch/ranking_0530/',
    pageObject: HddPage,
    transformer: new GenericDataTransformer({
      requiredFields: ['name', 'brand', 'price', 'releaseDate'],
      fields: {
        name: { source: 'name' },
        brand: { source: 'brand' },
        price: { source: 'price', type: 'price' },
        releaseDate: { source: 'releaseDate', type: 'date' },
        capacity: { source: 'capacity' },
        rpm: { source: 'rpm' },
        interfaceSpec: { source: 'interfaceSpec' },
        magneticRecordingType: { source: 'magneticRecordingType' },
        image: { source: 'imgSrc', type: 'image' },
      },
      imageSaveDir: './images/hdd',
    }),
    repository: new HddRepository(),
  },
  ssd: {
    url: 'https://kakaku.com/pc/ssd/ranking_0537/',
    pageObject: SsdPage,
    transformer: new GenericDataTransformer({
      requiredFields: ['name', 'brand', 'price', 'releaseDate'],
      fields: {
        name: { source: 'name' },
        brand: { source: 'brand' },
        price: { source: 'price', type: 'price' },
        releaseDate: { source: 'releaseDate', type: 'date' },
        capacity: { source: 'capacity' },
        standard: { source: 'standard' },
        interfaceSpec: { source: 'interfaceSpec' },
        type: { source: 'type' },
        readSpeed: { source: 'readSpeed' },
        writeSpeed: { source: 'writeSpeed' },
        image: { source: 'imgSrc', type: 'image' },
      },
      imageSaveDir: './images/ssd',
    }),
    repository: new SsdRepository(),
  },
};
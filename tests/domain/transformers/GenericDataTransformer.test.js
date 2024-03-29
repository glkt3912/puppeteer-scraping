import { GenericDataTransformer } from '../../../src/domain/transformers/GenericDataTransformer';
import { parseDateToIsoStringJST, parsePrice } from '../../../src/domain/utils/TransformUtils';

// Axiosのモック化
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: 'dummyImageData' }))
}));

describe('CpuData', () => {
  it('should transform scraped data into the expected format', async () => {
    const scrapedData = [{
      name: "Ryzen 7 5800X",
      brand: "AMD",
      price: "29980",
      releaseDate: "2020年11月6日",
      generation: "Ryzen 5000シリーズ",
      frequency: "3.8GHz",
      socket: "Socket AM4",
      cache: "4MB",
      imgSrc: "https://example.com/image.jpg"
    }];

    const transformerConfig = {
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
    };

    const expectedData =[{
      name: scrapedData[0].name,
      brand: scrapedData[0].brand,
      price: parsePrice(scrapedData[0].price),
      releaseDate: parseDateToIsoStringJST(scrapedData[0].releaseDate),
      generation: scrapedData[0].generation,
      frequency: scrapedData[0].frequency,
      socket: scrapedData[0].socket,
      cache: scrapedData[0].cache,
      image: "images/cpu/Ryzen_7_5800X.jpg",
    }];

    const transformer = new GenericDataTransformer(transformerConfig);
    const transformedData = await transformer.transform(scrapedData);
    expect(transformedData).toEqual(expectedData);
  });
});

describe('GpuData', () => {
  it('should transform scraped data into the expected format', async () => {
    const scrapedData = [{
      name: "GeForce RTX 4070 Ti VENTUS 2X 12G OC [PCIExp 12GB]",
      brand: "MSI(エムエスアイ)",
      price: "121800",
      releaseDate: "2023年9月21日",
      chip: "NVIDIA/GeForce RTX 4070 Ti",
      interface: "PCI Express 4.0",
      displayInput: "HDMI2.1a x1/DisplayPort1.4a x3",
      memory: "GDDR6X/12GB",
      wattage: "285W",
      imgSrc: "https://example.com2/image.jpg"
    }];

    const transformerConfig = {
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
    };

    const expectedData =[{
      name: scrapedData[0].name,
      brand: scrapedData[0].brand,
      price: parsePrice(scrapedData[0].price),
      releaseDate: parseDateToIsoStringJST(scrapedData[0].releaseDate),
      chip: scrapedData[0].chipset,
      interface: scrapedData[0].busInterface,
      displayInput: scrapedData[0].displayInput,
      memory: scrapedData[0].memory,
      wattage: scrapedData[0].wattage,
      image: "images/gpu/GeForce_RTX_4070_Ti_VENTUS_2X_12G_OC_[PCIExp_12GB].jpg",
    }];

    const transformer = new GenericDataTransformer(transformerConfig);
    const transformedData = await transformer.transform(scrapedData);
    expect(transformedData).toEqual(expectedData);
  });
});

describe('MemoryData', () => {
  it('should transform scraped data into the expected format', async () => {
    const scrapedData = [{
      name: "CT2K16G4DFRA32A [DDR4 PC4-25600 16GB 2枚組]",
      brand: "crucial(クルーシャル)",
      price: "10480",
      releaseDate: "2021年7月20日",
      capacity: "",
      count: "2枚",
      memoryStandard: "DDR4 SDRAM",
      memoryInterface: "DIMM",
      moduleStandard: "PC4-25600(DDR4-3200)",
      imgSrc: "https://example.com2/image.jpg"
    }];

    const transformerConfig = {
      requiredFields: ['name', 'brand', 'price', 'releaseDate'],
      fields: {
        name: { source: 'name' },
        brand: { source: 'brand' },
        price: { source: 'price', type: 'price' },
        releaseDate: { source: 'releaseDate', type: 'date' },
        capacity: { source: 'capacity' },
        count: { source: 'count' },
        memoryStandard: { source: 'memoryStandard' },
        memoryInterface: { source: 'memoryInterface' },
        moduleStandard: { source: 'moduleStandard' },
        image: { source: 'imgSrc', type: 'image' },
      },
      imageSaveDir: './images/memory',
    };

    const expectedData =[{
      name: scrapedData[0].name,
      brand: scrapedData[0].brand,
      price: parsePrice(scrapedData[0].price),
      releaseDate: parseDateToIsoStringJST(scrapedData[0].releaseDate),
      capacity: scrapedData[0].capacity,
      count: scrapedData[0].count,
      memoryStandard: scrapedData[0].memoryStandard,
      memoryInterface: scrapedData[0].memoryInterface,
      moduleStandard: scrapedData[0].moduleStandard,
      image: "images/memory/CT2K16G4DFRA32A_[DDR4_PC4-25600_16GB_2枚組].jpg",
    }];

    const transformer = new GenericDataTransformer(transformerConfig);
    const transformedData = await transformer.transform(scrapedData);
    expect(transformedData).toEqual(expectedData);
  });
});

describe('CoolerData', () => {
  it('should transform scraped data into the expected format', async () => {
    const scrapedData = [{
      name: "AK620 R-AK620-BKNNMT-G",
      brand: "DEEPCOOL(ディープクール)",
      price: "7522",
      releaseDate: "2021年10月9日",
      type: 'サイドフロー型',
      size: '129x160x138mm',
      tdp: '最大260W',
      noiseMaxLevel: '28dBA',
      imgSrc: 'https://img1.kakaku.k-img.com/images/productimage/t/K0001382333.jpg'
    }];

    const transformerConfig = {
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
    };

    const expectedData =[{
      name: scrapedData[0].name,
      brand: scrapedData[0].brand,
      price: parsePrice(scrapedData[0].price),
      releaseDate: parseDateToIsoStringJST(scrapedData[0].releaseDate),
      type: scrapedData[0].type,
      size: scrapedData[0].size,
      tdp: scrapedData[0].tdp,
      noiseMaxLevel: scrapedData[0].noiseMaxLevel,
      image: "images/cooler/AK620_R-AK620-BKNNMT-G.jpg",
    }];

    const transformer = new GenericDataTransformer(transformerConfig);
    const transformedData = await transformer.transform(scrapedData);
    expect(transformedData).toEqual(expectedData);
  });
});
import { GenericDataTransformer } from '../../../src/domain/transformers/Transformers';
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
import { CpuDataTransformer } from '../../../src/domain/transformers/Transformers';
import { parseDate, parsePrice } from '../../../src/domain/utils/TransformUtils';

// Axiosのモック化
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: 'dummyImageData' }))
}));

describe('CpuDataTransformer', () => {
  it('should transform scraped data into the expected format', async () => {
    // スクレイピングしたデータの例
    const scrapedData = {
      name: "Ryzen 7 5800X",
      brand: "AMD",
      price: "¥29,980",
      releaseDate: "2020年11月6日",
      generation: "Ryzen 5000シリーズ",
      frequency: "3.8GHz",
      socket: "Socket AM4",
      cache: "4MB",
      imgSrc: "https://example.com/image.jpg"
    };

    const expectedData =[{
      name: scrapedData.name,
      brand: scrapedData.brand,
      price: parsePrice(scrapedData.price),
      releaseDate: parseDate(scrapedData.releaseDate),
      generation: scrapedData.generation,
      frequency: scrapedData.frequency,
      socket: scrapedData.socket,
      cache: scrapedData.cache,
      image: "images/cpu/image.jpg",
    }];

    // CpuDataTransformer のインスタンスを作成
    const transformer = new CpuDataTransformer();

    // スクレイピングしたデータを変換
    const transformedData = await transformer.transform(scrapedData);

    // 変換されたデータが期待される形式であることを検証
    expect(transformedData).toEqual(expectedData);
  });
});
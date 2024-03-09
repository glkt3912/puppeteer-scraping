import { CpuDataTransformer } from '../../../src/domain/transformers/Transformers';
import { parseDateToIsoStringJST, parsePrice } from '../../../src/domain/utils/TransformUtils';

// Axiosのモック化
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: 'dummyImageData' }))
}));

describe('CpuDataTransformer', () => {
  it('should transform scraped data into the expected format', async () => {
    // スクレイピングしたデータの例
    const scrapedData = [{
      name: "Ryzen 7 5800X",
      brand: "AMD",
      price: "¥29,980",
      releaseDate: "2020年11月6日",
      generation: "Ryzen 5000シリーズ",
      frequency: "3.8GHz",
      socket: "Socket AM4",
      cache: "4MB",
      imgSrc: "https://example.com/image.jpg"
    }];

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

    // CpuDataTransformer のインスタンスを作成
    const transformer = new CpuDataTransformer();

    // スクレイピングしたデータを変換
    const transformedData = await transformer.transform(scrapedData);

    // 変換されたデータが期待される形式であることを検証
    expect(transformedData).toEqual(expectedData);
  });
});
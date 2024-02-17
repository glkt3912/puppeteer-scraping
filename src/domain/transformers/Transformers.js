import { parseDate, parsePrice } from '../utils/TransformUtils.js';
import Image from '../utils/Image.js';

export class CpuDataTransformer {
  /**
   * スクレイピングデータをドメインモデルの形式(CPU)に変換するロジック
   *
   * @param {*} scrapedData
   * @returns
   */
  async transform(scrapedData) {
    if (!scrapedData.name || !scrapedData.brand) {
      throw new Error(
        `Missing required fields in scraped data: ${JSON.stringify(scrapedData)}`,
      );
    }
    
    const image = new Image({ url: scrapedData.imgSrc, partType: 'cpu' });
    const imagePath = await image.downloadAndSave();
    const transformed = {
      name: scrapedData.name,
      brand: scrapedData.brand,
      price: parsePrice(scrapedData.price || '0'),
      releaseDate: parseDate(scrapedData.releaseDate),
      generation: scrapedData.generation,
      frequency: scrapedData.frequency,
      socket: scrapedData.socket,
      cache: scrapedData.cache,
      image: imagePath,
    };

    return [transformed];
  }
}


export class GpuDataTransformer {
  /**
   * スクレイピングデータをドメインモデルの形式(GPU)に変換するロジック
   *
   * @param {*} scrapedData
   * @returns
   */
  async transform(scrapedData) {
    if (!scrapedData.name || !scrapedData.brand) {
      throw new Error(
        `Missing required fields in scraped data: ${JSON.stringify(scrapedData)}`,
      );
    }
    const image = new Image({ url: scrapedData.imgSrc, partType: 'gpu' });
    const imagePath = await image.downloadAndSave();
    const transformed = {
      name: scrapedData.name,
      brand: scrapedData.brand,
      price: parsePrice(scrapedData.price || '0'),
      releaseDate: parseDate(scrapedData.releaseDate),
      chip: scrapedData.chipset,
      interface: scrapedData.busInterface,
      displayInput: scrapedData.displayInput,
      memory: scrapedData.memory,
      wattage: scrapedData.wattage,
      image: imagePath,
    };

    return [transformed];
  }
}

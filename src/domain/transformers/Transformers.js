import { parseDate, parsePrice } from '../utils/TransformUtils.js';
import Image from '../utils/Image.js';

export class CpuDataTransformer {
  /**
   * データが変換に適しているかどうかを検証する
   *
   * @param {Object} data 検証するデータ
   * @returns {boolean} 検証結果
   */
  isValidData(data) {
    // 必要な項目がすべて存在し、適切な値を持っているかチェック
    return data.name && data.brand && data.price && data.releaseDate && data.generation && data.frequency && data.socket && data.cache && data.imgSrc;
  }

  /**
   * スクレイピングデータをドメインモデルの形式(CPU)に変換するロジック
   * 不備があるデータは除外する
   *
   * @param {Array} scrapedDataArray スクレイピングしたデータの配列
   * @returns {Promise<Array>} 変換後のデータの配列
   */
  async transform(scrapedDataArray) {
    const transformedDataArray = [];
    for (const data of scrapedDataArray) {
      if (this.isValidData(data)) {
        const image = new Image({ url: data.imgSrc, partType: 'cpu' });
        const imagePath = await image.downloadAndSave();
        const transformedData = {
          name: data.name,
          brand: data.brand,
          price: parsePrice(data.price || 0),
          releaseDate: parseDate(data.releaseDate),
          generation: data.generation,
          frequency: data.frequency,
          socket: data.socket,
          cache: data.cache,
          image: imagePath,
        };
        transformedDataArray.push(transformedData);
      }
    }
    return transformedDataArray;
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

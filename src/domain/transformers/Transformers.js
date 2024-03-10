import { parsePrice, parseDateToIsoStringJST } from '../utils/TransformUtils.js';
import { ImageService } from '../../application/services/ImageService.js';

export class CpuDataTransformer {
  /**
   * データが変換に適しているかどうかを検証する
   *
   * @param {Object} data 検証するデータ
   * @returns {boolean} 検証結果
   */
  isValidData(data) {
    return data.name && data.brand && data.price && data.releaseDate && data.generation && data.frequency && data.socket && data.cache && data.imgSrc;
  }

  /**
   * スクレイピングデータをドメインモデルの形式(CPU)に変換するロジック
   * 不備があるデータは除外する
   *
   * @param {Array} scrapedDataArray スクレイピングしたデータの配列
   * @returns {Promise<Array>} 変換後のデータの配列
   */

  async transform(scrapedData) {
    const scrapedDataArray = Array.isArray(scrapedData) ? scrapedData : [scrapedData];
    const transformedDataArray = await Promise.all(scrapedDataArray.map(async (data) => {
      if (!this.isValidData(data)) return null; // 不備があるデータはスキップ

      try {
        const releaseDateObject = parseDateToIsoStringJST(data.releaseDate);
        const imageFileName = `${data.name.replace(/[\s\/\\?%*:|"<>]/g, '_')}.jpg`; // 画像ファイル名の生成例
        const saveDir = './images/cpu'; // 保存ディレクトリの指定
        const imagePath = await ImageService.downloadAndSaveImage(data.imgSrc, saveDir, imageFileName);
        const transformedData = {
          name: data.name,
          brand: data.brand,
          price: parsePrice(data.price || '0'),
          releaseDate: releaseDateObject,
          generation: data.generation,
          frequency: data.frequency,
          socket: data.socket,
          cache: data.cache,
          image: imagePath,
        };
        return transformedData;
      } catch (error) {
        console.error(`Error downloading image for ${data.name}: ${error}`);
        return null; // 画像ダウンロードに失敗したデータは除外
      }
    }));

    return transformedDataArray.filter(data => data !== null);
  }
}

export class GpuDataTransformer {
    /**
   * データが変換に適しているかどうかを検証する
   *
   * @param {Object} data 検証するデータ
   * @returns {boolean} 検証結果
   */
    isValidData(data) {
      return data.name && data.brand && data.price && data.releaseDate && data.chipset && data.busInterface && data.displayInput && data.imgSrc;
    }

  /**
   * スクレイピングデータをドメインモデルの形式(GPU)に変換するロジック
   *
   * @param {*} scrapedData
   * @returns
   */
  async transform(scrapedData) {
    const scrapedDataArray = Array.isArray(scrapedData) ? scrapedData : [scrapedData];
    const transformedDataArray = await Promise.all(scrapedDataArray.map(async (data) => {
      if (!this.isValidData(data)) return null; // 不備があるデータはスキップ

      try {
        const releaseDateObject = parseDateToIsoStringJST(data.releaseDate);
        const imageFileName = `${data.name.replace(/[\s\/\\?%*:|"<>]/g, '_')}.jpg`; // 画像ファイル名の生成例
        const saveDir = './images/gpu'; // 保存ディレクトリの指定
        const imagePath = await ImageService.downloadAndSaveImage(data.imgSrc, saveDir, imageFileName);
        const transformedData = {
          name: data.name,
          brand: data.brand,
          price: parsePrice(data.price || '0'),
          releaseDate: releaseDateObject,
          chip: data.chipset,
          interface: data.busInterface,
          displayInput: data.displayInput,
          memory: data.memory,
          wattage: data.wattage,
          image: imagePath,
        };
        return transformedData;
      } catch (error) {
        console.error(`Error downloading image for ${data.name}: ${error}`);
        return null; // 画像ダウンロードに失敗したデータは除外
      }
    }));

    return transformedDataArray.filter(data => data !== null);
  }
}

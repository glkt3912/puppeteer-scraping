import { parsePrice, parseDateToIsoStringJST } from '../utils/TransformUtils.js';
import { ImageService } from '../../application/services/ImageService.js';

export class GenericDataTransformer {
  constructor(config) {
    this.config = config; // 特定のパーツタイプに対する設定
  }

  isValidData(data) {
    return this.config.requiredFields.every((field) => {
      const isValid = data[field] !== undefined && data[field] !== null;
      if (!isValid) {
        console.log(`Missing or invalid field: ${field}`);
      }
      return isValid;
    });
  }

  async transform(scrapedData) {
    const scrapedDataArray = Array.isArray(scrapedData) ? scrapedData : [scrapedData];
    const transformedDataArray = await Promise.all(
      scrapedDataArray.map(async (data) => {

        if (!this.isValidData(data)) return null; // 必須フィールドが欠けているデータは除外

        const transformedData = {};
        try {
          for (const [field, config] of Object.entries(this.config.fields)) {
            switch (config.type) {
              case 'image':
                const imageFileName = `${data.name.replace(/[\s\/\\?%*:|"<>]/g, '_')}.jpg`;
                transformedData[field] = await ImageService.downloadAndSaveImage(
                  data[config.source],
                  this.config.imageSaveDir,
                  imageFileName,
                );
                break;
              case 'date':
                transformedData[field] = parseDateToIsoStringJST(data[config.source]);
                break;
              case 'price':
                transformedData[field] = parsePrice(data[config.source] || '0');
                break;
              default:
                transformedData[field] = data[config.source];
                break;
            }
          }
          return transformedData;
        } catch (error) {
          console.error(`Error processing data for ${data.name}: ${error}`);
          return null; // 処理中にエラーが発生したデータは除外
        }
      })
    );

    return transformedDataArray.filter((data) => data !== null); // nullを除外して結果を返す
  }
}
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export class ImageService {
  static async downloadAndSaveImage(imageUrl, saveDir, fileName) {
    const filePath = path.join(saveDir, fileName);
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 60000, // 1分のタイムアウト
      });
      fs.writeFileSync(filePath, response.data);
      console.log(`Image saved to ${filePath}`);
      return filePath;
    } catch (error) {
      console.error(`Failed to download image: ${error.message}`);
      return null;
    }
  }
}
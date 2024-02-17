import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

class Image {
  constructor({ url, partType }) {
    this.url = url;
    this.partType = partType;
  }

  async downloadAndSave() {
    let filePath;
    // 環境変数や設定ファイルから画像の保存先のベースディレクトリを取得
    const baseDir = dotenv.config().parsed.IMAGE_SAVE_DIR || './images';
    // パーツごとのサブディレクトリを設定
    console.log(baseDir);
    const saveDir = path.join(baseDir, this.partType);
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }

    try {
      const response = await axios.get(this.url, {
        responseType: 'arraybuffer',
      });
      const fileName = path.basename(new URL(this.url).pathname);
      filePath = path.join(saveDir, fileName);

      // 画像ファイルを保存
      fs.writeFileSync(filePath, response.data);
      console.log(`Image saved to ${filePath}`);
    } catch (error) {
      console.error(`Failed to download image: ${error}`);
    }
    return filePath;
  }
}

export default Image;

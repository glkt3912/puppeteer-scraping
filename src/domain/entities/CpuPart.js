/**
 * CPUに関する情報(名前、価格、仕様、コア数、クロック速度など)を表すエンティティ
 */
export default class CpuPart {
  constructor({ name, price, releaseDate, brand, generation, frequency, socket, cache, imgSrc }) {
    this.name = name; // 商品名
    this.price = price; // 価格(最安値)
    this.brand = brand; // ブランド
    this.releaseDate = releaseDate; // 発売日
    this.generation = generation; // 世代
    this.frequency = frequency; // クロック周波数
    this.socket = socket; // ソケット形状
    this.cache = cache; // 二次キャッシュ
    this.imgSrc = imgSrc; // 画像URL
  }
}

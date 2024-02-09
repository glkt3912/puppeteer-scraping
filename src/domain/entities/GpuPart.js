/**
 * GPUに関する情報を表すエンティティ
 */
export default class GpuPart {
    constructor({ name, price, brand, releaseDate, chipset, busInterface, displayInput, memory, wattage, imgSrc }) {
      this.name = name; // 商品名
      this.price = price; // 価格(最安値)
      this.brand = brand; // ブランド
      this.releaseDate = releaseDate; // 発売日
      this.chipset = chipset; // 搭載チップ
      this.busInterface = busInterface; // バスインターフェース
      this.displayInput = displayInput; // モニタ端子
      this.memory = memory; // メモリ
      this.wattage = wattage; // 消費電力
      this.imgSrc = imgSrc; // 画像URL
    }
  }
/**
 * PCパーツに関する情報(名前、価格、仕様)を表すエンティティ
 */
class PcPart {
  constructor({ id, name, price, specifications }) {
    this.id = id; // パーツの一意識別子
    this.name = name; // パーツの名前
    this.price = price; // パーツの価格
    this.specifications = specifications; // パーツの仕様（例: メモリサイズ、CPUの種類など）
  }

  // パーツの価格を更新するメソッド
  updatePrice(newPrice) {
    this.price = newPrice;
  }

  // パーツの仕様を更新するメソッド
  updateSpecifications(newSpecifications) {
    this.specifications = newSpecifications;
  }

  // パーツ情報を文字列で表現するメソッド
  toString() {
    return `PcPart: ${this.name}, Price: ${this.price}, Specifications: ${JSON.stringify(this.specifications)}`;
  }
}

export default PcPart;

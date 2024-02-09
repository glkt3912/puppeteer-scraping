/**
 * PCパーツに関する情報(名前、価格、仕様)を表すエンティティ
 */
class PcPart {
  constructor(id, type, specifications) {
    this.id = id; // 一意の識別子
    this.type = type; // パーツの種類（CPU、GPUなど）
    this.specifications = specifications; // パーツの仕様（バリューオブジェクト）
  }

  updateSpecifications(newSpecifications) {
      this.specifications = newSpecifications;
  }
}

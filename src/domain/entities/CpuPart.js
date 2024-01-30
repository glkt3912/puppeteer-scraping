/**
 * CPUに関する情報(名前、価格、仕様、コア数、クロック速度など)を表すエンティティ
 */
class CpuPart {
    constructor({ name, price, processor, generation, frequency, socket, cache }) {
        this.name = name; // CPUの名前
        this.price = price; // CPUの価格
        this.processor = processor;
        this.generation = generation;
        this.frequency = frequency;
        this.socket = socket;
        this.cache = cache;
    }
  
    // CPUの価格を更新するメソッド
    updatePrice(newPrice) {
      this.price = newPrice;
    }
  
    // CPU情報を文字列で表現するメソッド
    toString() {
      return `CpuPart: ${this.name}, Price: ${this.price}, Processor: ${this.processor}, Generation: ${this.generation}, Frequency: ${this.frequency}, Socket: ${this.socket}, Cache: ${this.cache}`;
    }
  }
  
  export default CpuPart;
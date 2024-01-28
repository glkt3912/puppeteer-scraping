class PcPartRepository {
    constructor(database) {
      this.database = database;
    }
  
    async add(pcPart) {
      // データベースにPCパーツを追加
    }
  
    async findById(id) {
      // IDに基づいてPCパーツを検索
    }
  
    async update(pcPart) {
      // PCパーツの情報を更新
    }

    async delete(id) {
        // PCパーツを削除
    }
}

export default PcPartRepository;
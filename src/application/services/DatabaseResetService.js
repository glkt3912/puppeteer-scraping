class DatabaseResetService {
  constructor(repository) {
    this.repository = repository;
  }

  async resetDatabase() {
    // 本番環境での実行を防ぐ
    // if (process.env.NODE_ENV === 'production') {
    //   throw new Error('Database reset is not allowed in production environment.');
    // }

    // データベースのリセット処理
    await this.repository.resetData();
    console.log('Database has been reset successfully.');
  }
}

export default DatabaseResetService;

import { repositoryMap } from "../../infrastructure/config/scrapingConfig.js";
import DatabaseResetService from "../services/DatabaseResetService.js";

const partType = process.argv[2];
const RepositoryClass = repositoryMap[partType];

// マッピングにパーツタイプが存在するかチェックし、対応するリポジトリインスタンスを生成
if (RepositoryClass) {
  const repository = new RepositoryClass();
  // データベースリセットサービスのインスタンスを作成して実行
  const resetService = new DatabaseResetService(repository);
  resetService.resetDatabase().catch(console.error);
} else {
  console.error('Invalid part type specified.');
}
# PCパーツスクレイピングプロジェクト

このプロジェクトは、ドメイン駆動設計（DDD）の原則に基づいて構築された、PCパーツの情報をスクレイピングし、加工してデータベースに保存するためのNode.jsアプリケーションです。
Puppeteerを使用して特定のウェブサイトからPCパーツの最新情報や価格を収集し、加工して保存します。

## 目的

- 学習: PuppeteerとNode.jsを使用したウェブスクレイピングの基本を学びます。
- 実践: DDDの原則を実際のプロジェクトに適用し、モジュール性と再利用性の高いコードを書く練習も兼ねています。
- 情報収集: PCパーツの最新情報や価格を自動で収集し、分析や比較のためのデータベースを構築します。

## 特徴

- Puppeteerを使用したスクレイピング: ヘッドレスブラウザを制御して、動的なウェブサイトから情報を収集します。
- DDDアプローチ: エンティティ、バリューオブジェクト、リポジトリなど、DDDの概念を用いて設計しています。
- モジュール性と再利用性: コンポーネントは独立しており、他のプロジェクトや異なるドメインでの再利用が容易となるよう実装しています。

## ディレクトリ構成

```

./src
├── application
│   ├── services
│   │   ├── DatabaseResetService.js
│   │   ├── GenericScrapingService.js
│   │   ├── ImageService.js
│   │   └── ScrapingService.js
│   └── usecases
│       ├── ScrapeAndSavePartData.js
│       └── ScrapePartsUseCase.js
├── domain
│   ├── entities
│   │   ├── CpuPart.js
│   │   ├── GpuPart.js
│   │   └── PcPart.js
│   ├── transformers
│   │   └── Transformers.js
│   └── utils
│       └── TransformUtils.js
├── infrastructure
│   ├── config
│   │   ├── componentMapping.js
│   │   ├── pageObjectMapping.js
│   │   └── scrapingConfig.js
│   ├── repositories
│   │   ├── CategoryRepository.js
│   │   ├── CpuRepository.js
│   │   └── GpuRepository.js
│   └── scraping
│       ├── pageObjects
│       │   ├── CoolerPage.js
│       │   ├── CpuPage.js
│       │   ├── DisplayPage.js
│       │   ├── GpuPage.js
│       │   ├── HddPage.js
│       │   ├── MemoryPage.js
│       │   ├── MotherboardPage.js
│       │   ├── PcCasePage.js
│       │   ├── PowerPage.js
│       │   └── SsdPage.js
│       └── strategies
│           ├── ExampleSiteScraper.js
│           ├── GenericScraper.js
│           └── ISiteScraper.js
├── scrape
│   └── GenericScrape.js
└── scripts
    └── resetDatabase.js

```

### 主なディレクトリの説明

- /application
  - アプリケーションの主要なビジネスロジックが含まれます。この層は、ドメイン層とインフラストラクチャ層の間を仲介し、アプリケーションのユースケースを実装します。
  - /services
    - アプリケーションサービスを格納します。これらのサービスは、特定のビジネスロジックやユースケースの実行を担当します。
  - /usecases
    - システムが提供する機能（ユースケース）を実装するクラスやスクリプトが含まれます。
- /domain
  - ビジネスロジックとビジネスルールをカプセル化します。この層はアプリケーションのコアであり、アプリケーションが解決しようとしているビジネス問題に直接関連しています。
  - /entities
    - ビジネスドメインのエンティティ（例: CpuPart, GpuPart）が定義されています。エンティティはビジネスの基本的な概念とルールを表します。
  - /transformers
    - スクレイピングしたデータをドメインモデルに変換するためのクラスが含まれます。
  - /utils
    - ドメイン層で使用されるユーティリティ関数や共通のロジックを格納します。
- /infrastructure
  - インフラストラクチャ層には、アプリケーションの外部とのインターフェース（例: データベースアクセス、外部APIの呼び出し）が含まれます。
  - /config
    - アプリケーションの設定ファイルや定数を格納します。
  - /repositories
    - データの永続化と取得を担当するリポジトリクラスが含まれます。これらはドメインエンティティとデータベース間のインターフェースを提供します。
  - /scraping
    - スクレイピングロジックとページオブジェクトが含まれます。
    - /pageObjectsはスクレイピング対象のページの構造を表し、/strategiesは具体的なスクレイピング戦略を実装します。
- /scrape
  - スクレイピングを実行するためのエントリポイントやスクリプトが含まれます。これらのスクリプトは、CLIから直接実行されることを意図しています。
- /scripts
  - データベースのリセットなど、開発中に便利なスクリプトが含まれます。これらは主に開発支援のために使用されます。

## 使用方法

1. 依存関係のインストール: プロジェクトのルートディレクトリで以下のコマンドを実行して、必要な依存関係をインストールします。
```
pnpm install
```

2. スクレイピングの実行: スクレイピングを実行するには、以下のコマンドを使用します。cpuの部分は、スクレイピングしたいパーツの種類に応じて変更してください。

```
pnpm scrape cpu
```

3. スクレイピングしたデータの保存

* データベース接続の設定: .envファイルを編集して、データベースへの接続情報を設定します。例えば、PostgreSQLを使用する場合、以下のように設定します。
```
DATABASE_URL="postgresql://ユーザー名:パスワード@ホスト名:ポート/データベース名"
```

* Prismaの初期化、マイグレーションの作成
```
npx prisma init
npx prisma migrate dev
```

* パーツデータ保存用のスクリプト実行

```
pnpm scrapeSave ****
```

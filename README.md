# PCパーツスクレイピングプロジェクト用のプロジェクト

ドメイン駆動設計（DDD）を意識して設計された、PCパーツの情報をスクレイピングするための開発中アプリケーションです。
Puppeteer、Node.jsを使用して、特定のウェブサイト（価格コム）からPCパーツの最新情報や価格を収集します。
現状ではCLIでの実行を前提としています。

## 目的

- 学習: PuppeteerとNode.jsを使用したウェブスクレイピングの基本を学びます。
- 実践: DDDの原則を実際のプロジェクトに適用し、モジュール性と再利用性の高いコードを書く練習をします。
- 情報収集: PCパーツの最新情報や価格を自動で収集し、分析や比較のためのデータベースを構築します。

## 特徴

- Puppeteerを使用したスクレイピング: ヘッドレスブラウザを制御して、動的なウェブサイトから情報を収集します。
- DDDアプローチ: エンティティ、バリューオブジェクト、リポジトリなど、DDDの概念を用いて設計しています。
- モジュール性と再利用性: コンポーネントは独立しており、他のプロジェクトや異なるドメインでの再利用が容易です。

## ディレクトリ構成

このプロジェクトは、以下のようなディレクトリ構成を持っています。各ディレクトリの役割を簡単に説明します。

```
/src
├── application                             # アプリケーション層 (アプリケーションサービス)
│   └── services
│       └── GenericScrapingService.js
|
├── domain                                  # ドメイン層 (エンティティ、バリューオブジェクト)
│   └── entities
│       ├── CpuPart.js
│       ├── GpuPart.js
│       └── PcPart.js
|
├── infrastructure                           # インフラストラクチャ層 (Puppeteer)
│   ├── config
│   │   └── scrapingUrls.js                  # スクレイピング元のURL
│   ├── repositories
│   │   └── CpuRepositry.js
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
├── main.js
└── scrape
    └── GenericScrape.js                    # スクレイピングのエンドポイント

```

### 主なディレクトリの説明

- application/: アプリケーション層を含み、アプリケーションの主要なビジネスロジックを実装します。
- domain/: ドメイン層を含み、エンティティやバリューオブジェクトなど、ビジネスの核となるロジックを実装します。
- infrastructure/: インフラストラクチャ層を含み、データベースアクセスや外部APIの呼び出しなど、外部リソースへのアクセスを実装します。
- scrape/: スクレイピングをCLI上で実行するスクリプトのエントリポイントです。

## 始め方

### 前提条件

- Node.jsがインストールされていること。
- npmやyarnなどのパッケージマネージャーが利用可能であること。

### インストール

プロジェクトのクローンと依存関係のインストールを行います。

```bash
git clone https://github.com/glkt3912/puppeteer-scraping.git
cd puppeteer-scraping
npm install
```

### 実行

CLI上でスクリプトを実行し、PCパーツの情報をスクレイピングします。
下記例のようにparttypeを指定してください。
※ parttype: cpu, gpu, motherboard, power, hdd, ssd, memory, cooler, pccase, display

```bash
npm run scrape cpu
```

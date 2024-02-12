class CpuDataTransformer {
  /**
   * スクレイピングデータをドメインモデルの形式に変換するロジック
   *
   * @param {*} scrapedData
   * @returns
   */
  transform(scrapedData) {
    return {
      name: scrapedData.name,
      brand: scrapedData.brand,
      price: this.parsePrice(scrapedData.price),
      releaseDate: this.parseDate(scrapedData.releaseDate),
      generation: scrapedData.generation,
      frequency: scrapedData.frequency,
      socket: scrapedData.socket,
      cache: scrapedData.cache,
      image: scrapedData.imgSrc,
    };
  }

  /**
   * 価格文字列から通貨記号を除去し、整数に変換
   *
   * @param {*} priceString
   * @returns
   */
  parsePrice(priceString) {
    return parseInt(priceString.replace(/[^0-9]/g, ''), 10);
  }

  /**
   * 日付文字列をDateオブジェクトに変換
   *
   * @param {*} dateString
   * @returns
   */
  parseDate(dateString) {
    return new Date(dateString);
  }
}

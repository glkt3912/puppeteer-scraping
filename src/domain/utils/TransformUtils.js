import { parse, isValid } from 'date-fns';
import { format, zonedTimeToUtc } from 'date-fns-tz';

/**
 * 価格文字列から通貨記号を除去し、数値に変換する関数
 */
export function parsePrice(priceString) {
  if (typeof priceString !== 'string') {
    console.warn(`parsePrice received a non-string value: ${priceString}`);
    return 0; // または適切なデフォルト値
  }
  return parseInt(priceString.replace(/[^0-9]/g, ''), 10);
}

/**
 * 日付文字列をJSTとして解析し、UTCでのISO 8601形式の文字列に変換する
 * @param {string} dateString - 解析する日付文字列
 * @returns {string|null} - ISO 8601形式の日付文字列またはnull
 */
export function parseDateToIsoStringJST(dateString) {
  if (typeof dateString !== 'string') {
    console.error('dateString must be a string');
    return null;
  }
  // 引数で渡された日付文字列からすべての空白を削除
  dateString = dateString.replace(/\s+/g, '');

  // 日付の解析を試みる
  let date;
  let formatString = 'yyyy年MM月dd日';
  date = parse(dateString, formatString, new Date());
  if (!isValid(date)) {
    formatString = 'yyyy年M月';
    date = parse(dateString, formatString, new Date());
  }

  // 「上旬」「中旬」「下旬」の処理
  if (!isValid(date)) {
    const yearMonthMatch = dateString.match(/(\d{4})年(\d{1,2})月/);
    if (yearMonthMatch) {
      const [_, year, month] = yearMonthMatch;
      const day = dateString.includes('上旬')
        ? '01'
        : dateString.includes('中旬')
          ? '15'
          : dateString.includes('下旬')
            ? '28'
            : '01'; // デフォルトは月の初日
      date = new Date(
        `${year}-${month.padStart(2, '0')}-${day}T00:00:00+09:00`,
      );
    }
  }

  if (!isValid(date)) {
    return null; // 解析できない場合はnullを返す
  }

  // 解析した日付をJSTとしてUTCのDateオブジェクトに変換
  const utcDate = zonedTimeToUtc(date, 'Asia/Tokyo');

  // UTCのDateオブジェクトをISO 8601形式の文字列に変換
  return format(utcDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: 'UTC' });
}

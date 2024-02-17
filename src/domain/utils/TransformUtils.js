import { parse, isValid } from 'date-fns';

/**
 * 価格文字列から通貨記号を除去し、数値に変換する関数
 */
export function parsePrice(priceString) {
  return parseInt(priceString.replace(/[^0-9]/g, ''), 10);
}

/**
 * 日付文字列をDateオブジェクトに変換
 * 不正な日付の場合はnullを返す
 *
 * @param {*} dateString
 * @returns {Date | null}
 */
export function parseDate(dateString) {
  if (!dateString) {
    return null;
  }
  let parsedDate = parse(dateString, 'yyyy年MM月dd日', new Date());
  if (isValid(parsedDate)) return parsedDate;

  // 年と月のみの形式（月の初日を使用）
  parsedDate = parse(dateString, 'yyyy年M月', new Date());
  if (isValid(parsedDate)) return parsedDate;

  // 「上旬」を月の1日として扱う
  if (dateString.includes('上旬')) {
    const [year, month] = dateString.match(/(\d{4})年(\d{1,2})月/).slice(1);
    return new Date(year, month - 1, 1); // 月は0から始まるため
  }
  // 「中旬」を月の15日として扱う
  if (dateString.includes('中旬')) {
    const [year, month] = dateString.match(/(\d{4})年(\d{1,2})月/).slice(1);
    return new Date(year, month - 1, 15);
  }

  // 「下旬」を月の末日として扱う
  if (dateString.includes('下旬')) {
    const [year, month] = dateString.match(/(\d{4})年(\d{1,2})月/).slice(1);
    return new Date(year, month, 0); // 翌月の0日は前月の末日を指す
  }

  // 年のみの形式（その年の1月1日を使用）
  parsedDate = parse(dateString, 'yyyy年', new Date());
  if (isValid(parsedDate)) return parsedDate;

  // 解析できない場合はnullを返す
  return null;
}

const INPUT = Object.freeze({
  date: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
  order: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
});

const OUTPUT = Object.freeze({
  greeting: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  preview: '일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  order: '<주문 메뉴>',
  total_order: '<할인 전 총주문 금액>',
  free: '<증정 메뉴>',
  benefit: '<혜택 내역>',
  total_benefit: '<총혜택 금액>',
  total_pay: '<할인 후 예상 결제 금액>',
  badge: '<12월 이벤트 배지>',
});

const ERROR = Object.freeze({
  not_a_valid_date: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  not_a_valid_order: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

const DECEMBER = '12월 ';
const COUNT = '개';
const WON = '원';
const KO_KR = 'ko-KR';
const MINUS = '-';
const HYPHEN = '-';
const COMMA = ',';
const LINE_BREAK = '\n';

export { INPUT, OUTPUT, ERROR, DECEMBER, COUNT, WON, KO_KR, MINUS, HYPHEN, COMMA, LINE_BREAK };

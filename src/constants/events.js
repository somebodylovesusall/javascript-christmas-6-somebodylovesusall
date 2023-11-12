const EVENT = Object.freeze({
  christmas: '크리스마스 디데이 할인: ',
  weekdays: '평일 할인: ',
  weekends: '주말 할인: ',
  specials: '특별 할인: ',
  free: '증정 이벤트: ',
});

const ZERO = 0;
const ONE = 1;
const MIN_EVENT_PRICE = 10000;
const MIN_FREE_PRICE = 120000;
const MAX_ORDER_COUNT = 20;
const START_PRICE = 1000;
const ADD_PRICE = 100;
const END_PRICE = 3400;
const WEEK_PRICE = 2023;
const SPECIAL_PRICE = 1000;
const FREE_PRICE = 25000;
const FREE_COUNT = '샴페인 1개';
const STAR_PRICE = 5000;
const TREE_PRICE = 10000;
const SANTA_PRICE = 20000;
const DEFAULT = '없음';

export { EVENT, ZERO, ONE, MIN_EVENT_PRICE, MIN_FREE_PRICE, MAX_ORDER_COUNT, START_PRICE, ADD_PRICE, END_PRICE, WEEK_PRICE, SPECIAL_PRICE, FREE_PRICE, FREE_COUNT, STAR_PRICE, TREE_PRICE, SANTA_PRICE, DEFAULT };

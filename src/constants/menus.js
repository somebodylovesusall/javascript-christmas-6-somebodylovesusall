const APPETIZER = Object.freeze({
  '양송이수프': 6000,
  '타파스': 5500,
  '시저샐러드': 8000,
});

const MAIN = Object.freeze({
  '티본스테이크': 55000,
  '바비큐립': 54000,
  '해산물파스타': 35000,
  '크리스마스파스타': 25000,
});

const DESSERT = Object.freeze({
  '초코케이크': 15000,
  '아이스크림': 5000,
});

const DRINK = Object.freeze({
  '제로콜라': 3000,
  '레드와인': 60000,
  '샴페인': 25000,
});

const ONLY_MENU = ['양송이수프', '타파스', '시저샐러드', '티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타', '초코케이크', '아이스크림', '제로콜라', '레드와인', '샴페인'];
const ONLY_DRINK = ['제로콜라', '레드와인', '샴페인'];

export { APPETIZER, MAIN, DESSERT, DRINK, ONLY_MENU, ONLY_DRINK };

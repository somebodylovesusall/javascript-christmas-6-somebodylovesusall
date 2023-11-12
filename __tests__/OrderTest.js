import Order from '../src/Order.js';
import { discount } from '../src/variables/discounts.js';

describe('주문 클래스 테스트', () => {
  beforeEach(() => {
    Object.keys(discount).forEach(key => {
      discount[key] = false;
    });
  });

  test.each(
    [['티본스테이크3,해산물파스타2'], ['해산물파스타-3,해산물파스타-2'], ['티본스테이크-3,봉골레파스타-1'], ['레드와인-1'], ['해산물파스타-0,레드와인-1'], ['해산물파스타-3,레드와인-18']]
  )('주문 메뉴와 수량이 유효하지 않으면 예외가 발생한다.', order => {
    expect(() => {
      new Order(order.split(','));
    }).toThrow('[ERROR]');
  });

  test('주문 메뉴와 수량이 유효하면 예외가 발생하지 않는다.', () => {
    expect(() => {
      new Order('티본스테이크-3,해산물파스타-2'.split(','));
    }).not.toThrow();
  });
});

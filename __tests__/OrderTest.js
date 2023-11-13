import Order from '../src/Order.js';
import { discount } from '../src/variables/discounts.js';

describe('주문 클래스 테스트', () => {
  beforeEach(() => {
    Object.keys(discount).forEach(key => {
      discount[key] = false;
    });
  });

  test.each(
    [['티본스테이크3,해산물파스타2'], ['해산물파스타-3,해산물파스타-2'], ['티본스테이크-3,봉골레파스타-1'], ['레드와인-1'], ['해산물파스타-0,아이스크림-1'], ['해산물파스타-3,아이스크림-18']]
  )('주문 메뉴와 수량이 유효하지 않으면 예외가 발생한다.', order => {
    expect(() => {
      new Order(order.split(','));
    }).toThrow('[ERROR]');
  });

  test('주문 메뉴와 수량이 유효하면 예외가 발생하지 않는다.', () => {
    expect(() => {
      new Order('해산물파스타-2,레드와인-1,초코케이크-1'.split(','));
    }).not.toThrow();
  });

  test('주문 메뉴와 수량에 따른 총 주문 금액을 계산한다.', () => {
    const order = new Order('티본스테이크-3,해산물파스타-2'.split(','));
    const totalOrder = order.calculateTotalOrder();

    expect(totalOrder).toBe(235000);
  });

  test('할인 전 총 주문 금액이 10,000원 미만이면 할인하지 않는다.', () => {
    const order = new Order('아이스크림-1'.split(','));
    order.calculateTotalOrder();
    const menuDiscount = order.calculateDiscount();

    expect(menuDiscount).toBeUndefined();
  });

  test('평일이면 디저트 메뉴 1개당 2,023원을 할인한다.', () => {
    discount.weekdays = true;

    const order = new Order('티본스테이크-1,아이스크림-2'.split(','));
    order.calculateTotalOrder();
    const menuDiscount = order.calculateDiscount();

    expect(menuDiscount).toBe(4046);
  });

  test('주말이면 메인 메뉴 1개당 2,023원을 할인한다.', () => {
    discount.weekends = true;

    const order = new Order('티본스테이크-1,아이스크림-2'.split(','));
    order.calculateTotalOrder();
    const menuDiscount = order.calculateDiscount();

    expect(menuDiscount).toBe(2023);
  });

  test('주문 메뉴와 수량에 따른 증정 금액을 계산한다.', () => {
    discount.weekends = true;

    const order = new Order('티본스테이크-2,초코케이크-1'.split(','));
    order.calculateTotalOrder();
    const menuFree = order.calculateFree();

    expect(menuFree).toBe(25000);
  });
});

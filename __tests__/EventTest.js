import Event from '../src/Event.js';
import { benefit } from '../src/variables/benefits.js';

describe('이벤트 클래스 테스트', () => {
  let event;

  beforeEach(() => {
    event = new Event(142000);
  });

  test('할인 전 총 주문 금액을 전달받는다.', () => {
    expect(event.getTotalOrder()).toBe(142000);
  });

  test('총 할인 금액을 계산한다.', () => {
    const totalDiscount = event.calculateTotalDiscount(2200, 4046);

    expect(totalDiscount).toBe(6246);
  });

  test('증정 메뉴가 있으면 샴페인 1개를 보여 준다.', () => {
    benefit.free = 25000;
    const free = event.showFree();

    expect(free).toBe('샴페인 1개');
  });

  test('증정 메뉴가 없으면 없음을 보여 준다.', () => {
    benefit.free = 0;
    const free = event.showFree();

    expect(free).toBe('없음');
  });

  test('혜택 내역을 보여 준다.', () => {
    benefit.christmas = 1200;
    benefit.weekdays = 4046;
    benefit.weekends = 0;
    benefit.specials = 1000;
    benefit.free = 25000;

    const customerBenefit = event.showBenefit();

    expect(customerBenefit).toEqual([['크리스마스 디데이 할인: ', 1200], ['평일 할인: ', 4046], ['특별 할인: ', 1000], ['증정 이벤트: ', 25000]]);
  });

  test('총 혜택 금액을 계산한다.', () => {
    benefit.christmas = 1200;
    benefit.weekdays = 4046;
    benefit.weekends = 0;
    benefit.specials = 1000;
    benefit.free = 25000;

    const totalBenefit = event.calculateTotalBenefit();

    expect(totalBenefit).toBe(31246);
  });

  test('할인 후 예상 결제 금액을 계산한다.', () => {
    event.calculateTotalDiscount(2200, 4046);
    const totalPay = event.calculateTotalPay();

    expect(totalPay).toBe(135754);
  });

  test('총 혜택 금액이 5,000원 이상 10,000원 미만이면 별 배지를 부여한다.', () => {
    benefit.christmas = 1200;
    benefit.weekdays = 4046;
    benefit.weekends = 0;
    benefit.specials = 1000;
    benefit.free = 0;

    const badge = event.awardBadge();

    expect(badge).toBe('별');
  });

  test('총 혜택 금액이 10,000원 이상 20,000원 미만이면 트리 배지를 부여한다.', () => {
    benefit.christmas = 3400;
    benefit.weekdays = 6069;
    benefit.weekends = 0;
    benefit.specials = 1000;
    benefit.free = 0;

    const badge = event.awardBadge();

    expect(badge).toBe('트리');
  });

  test('총 혜택 금액이 20,000원 이상이면 산타 배지를 부여한다.', () => {
    benefit.christmas = 1200;
    benefit.weekdays = 4046;
    benefit.weekends = 0;
    benefit.specials = 1000;
    benefit.free = 25000;

    const badge = event.awardBadge();

    expect(badge).toBe('산타');
  });

  test('총 혜택 금액이 5,000원 미만이면 배지를 부여하지 않는다.', () => {
    benefit.christmas = 1200;
    benefit.weekdays = 0;
    benefit.weekends = 0;
    benefit.specials = 1000;
    benefit.free = 0;

    const badge = event.awardBadge();

    expect(badge).toBe('없음');
  });
});

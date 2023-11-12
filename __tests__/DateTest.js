import Date from '../src/Date.js';
import { discount } from '../src/variables/discounts.js';

describe('날짜 클래스 테스트', () => {
  beforeEach(() => {
    Object.keys(discount).forEach(key => {
      discount[key] = false;
    });
  });

  test.each([['3일'], ['3.25'], ['0'], ['32']])('식당 방문 날짜가 유효하지 않으면 예외가 발생한다.', date => {
    expect(() => {
      new Date(date);
    }).toThrow('[ERROR]');
  });

  test('식당 방문 날짜가 유효하면 예외가 발생하지 않는다.', () => {
    expect(() => {
      new Date('3');
    }).not.toThrow();
  });

  test.each`
    date    | result
    ${'23'} | ${true}
    ${'26'} | ${false}
  `('식당 방문 날짜의 크리스마스 디데이 할인 여부를 판단한다.', ({ date, result }) => {
    new Date(date).isChristmas();

    expect(discount.christmas).toBe(result);
  });

  test.each`
    date    | result
    ${'3'}  | ${true}
    ${'2'}  | ${false}
  `('식당 방문 날짜의 평일 할인 여부를 판단한다.', ({ date, result }) => {
    new Date(date).isWeekdays();

    expect(discount.weekdays).toBe(result);
  });

  test.each`
    date    | result
    ${'2'}  | ${true}
    ${'3'}  | ${false}
  `('식당 방문 날짜의 주말 할인 여부를 판단한다.', ({ date, result }) => {
    new Date(date).isWeekends();

    expect(discount.weekends).toBe(result);
  });

  test.each`
    date    | result
    ${'3'}  | ${true}
    ${'2'}  | ${false}
  `('식당 방문 날짜의 특별 할인 여부를 판단한다.', ({ date, result }) => {
    new Date(date).isSpecials();

    expect(discount.specials).toBe(result);
  });

  test('식당 방문 날짜에 따른 할인 금액을 계산한다.', () => {
    discount.christmas = true;
    discount.specials = true;

    const date = new Date('25');
    const dateDiscount = date.calculateDiscount();

    expect(dateDiscount).toBe(4400);
  });
});

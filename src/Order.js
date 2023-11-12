import { MIN_FREE_PRICE, MAX_ORDER_COUNT, MIN_EVENT_PRICE, ONE, WEEK_PRICE, ZERO, FREE_PRICE } from './constants/events.js';
import { WITH_DRINK, WITHOUT_DRINK, ONLY_DRINK, DESSERT, MAIN } from './constants/menus.js';
import { ERROR, HYPHEN } from './constants/messages.js';
import { discount } from './variables/discounts.js';
import { benefit } from './variables/benefits.js';

class Order {
  #orders;
  #totalOrder = ZERO;

  constructor(orders) {
    this.#validateOrder(orders);
    this.#validateMenu(orders);
    this.#validateQuantity();
  }

  getOrders() {
    return this.#orders;
  }

  #validateOrder(orders) {
    orders.forEach(order => {
      if (!/^[가-힣]+\-\d+$/.test(order)) {
        throw new Error(ERROR.not_a_valid_order);
      }
    });

    this.#orders = orders.reduce((result, order) => {
      const [menu, quantity] = order.split(HYPHEN);
      result[menu] = Number(quantity);
      return result;
    }, {});
  }

  #validateMenu(orders) {
    if (orders.length !== Object.keys(this.#orders).length) {
      throw new Error(ERROR.not_a_valid_order);
    }

    Object.keys(this.#orders).forEach(key => {
      if (!WITH_DRINK.includes(key)) {
        throw new Error(ERROR.not_a_valid_order);
      }

      if (!WITHOUT_DRINK.includes(key) && ONLY_DRINK.includes(key)) {
        throw new Error(ERROR.not_a_valid_order);
      }
    });
  }

  #validateQuantity() {
    let totalQuantity = ZERO;

    Object.values(this.#orders).forEach(value => {
      if (value < ONE) {
        throw new Error(ERROR.not_a_valid_order);
      }

      totalQuantity = totalQuantity + value;
    });

    if (totalQuantity > MAX_ORDER_COUNT) {
      throw new Error(ERROR.not_a_valid_order);
    }
  }

  calculateTotalOrder() {
    const menus = { ...APPETIZER, ...MAIN, ...DESSERT, ...DRINK, };

    Object.keys(this.#orders).forEach(key => {
      if (Object.keys(menus).includes(key)) {
        this.#totalOrder = this.#totalOrder + (this.#orders[key] * APPETIZER[key]);
      }
    });

    return this.#totalOrder;
  }

  calculateDiscount() {
    if (this.#totalOrder < MIN_EVENT_PRICE) return;

    if (discount.weekdays) {
      const dessertCount = Object.keys(this.#orders).filter(key => Object.keys(DESSERT).includes(key)).reduce((sum, key) => sum + this.#orders[key], ZERO);
      benefit.weekdays = dessertCount * WEEK_PRICE;
      return benefit.weekdays;
    }

    if (discount.weekends) {
      const mainCount = Object.keys(this.#orders).filter(key => Object.keys(MAIN).includes(key)).reduce((sum, key) => sum + this.#orders[key], ZERO);
      benefit.weekends = mainCount * WEEK_PRICE;
      return benefit.weekends;
    }
  }

  calculateFree() {
    if (this.#totalOrder >= MIN_FREE_PRICE) {
      benefit.free = FREE_PRICE;
    }
  }
}

export default Order;

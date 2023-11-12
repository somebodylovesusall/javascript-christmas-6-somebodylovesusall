import { MAX_ORDER_COUNT, ONE, ZERO } from './constants/events.js';
import { WITH_DRINK, WITHOUT_DRINK, ONLY_DRINK } from './constants/menus.js';
import { ERROR, HYPHEN } from './constants/messages.js';

class Order {
  #orders;
  #totalOrder;

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
    let totalQuantity = 0;

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


}

export default Order;

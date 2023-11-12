import { BADGE } from './constants/badges.js';
import { EVENT, FREE_PRICE, FREE_COUNT, SANTA_PRICE, STAR_PRICE, TREE_PRICE, DEFAULT, ZERO } from './constants/events.js';
import { benefit } from './variables/benefits.js';

class Event {
  #totalOrder;
  #totalDiscount;
  
  constructor(totalOrder) {
    this.#totalOrder = totalOrder;
  }

  getTotalOrder() {
    return this.#totalOrder;
  }

  calculateTotalDiscount(dateDiscount, menuDiscount) {
    this.#totalDiscount = dateDiscount + menuDiscount;
    return this.#totalDiscount;
  }

  showFree() {
    let free = DEFAULT;

    if (benefit.free === FREE_PRICE) {
      free = FREE_COUNT;
    }

    return free;
  }

  showBenefit() {
    const customerBenefit = [];

    Object.keys(benefit).forEach(key => {
      if (benefit[key] !== ZERO) {
        customerBenefit.push([EVENT[key], benefit[key]]);
      }
    });

    return customerBenefit;
  }

  calculateTotalBenefit() {
    return Object.values(benefit).reduce((acc, value) => acc + value, ZERO);
  }

  calculateTotalPay() {
    return this.#totalOrder - this.#totalDiscount;
  }

  awardBadge() {
    const totalBenefit = this.calculateTotalBenefit();
    let badge = DEFAULT;

    if (totalBenefit >= STAR_PRICE && totalBenefit < TREE_PRICE) {
      badge = BADGE.star;
    } else if (totalBenefit >= TREE_PRICE && totalBenefit < SANTA_PRICE) {
      badge = BADGE.tree;
    } else if (totalBenefit >= SANTA_PRICE) {
      badge = BADGE.santa;
    }

    return badge;
  }
}

export default Event;

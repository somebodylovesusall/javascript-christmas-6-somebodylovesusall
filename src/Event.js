import { BADGE, SANTA_PRICE, STAR_PRICE, TREE_PRICE } from './constants/badges.js';
import { EVENT, ZERO, CHAMPAGNE_COUNT, DEFAULT } from './constants/events.js';
import { benefit } from './variables/benefits.js';

class Event {
  #totalOrder;
  
  constructor(totalOrder) {
    this.#totalOrder = totalOrder;
  }

  calculateTotalDiscount(dateDiscount, menuDiscount) {
    return dateDiscount + menuDiscount;
  }

  showFree() {
    let free = DEFAULT;

    if (benefit.free !== ZERO) {
      free = CHAMPAGNE_COUNT;
    }

    return free;
  }

  showBenefit() {
    const customerBenefit = [];

    Object.keys(benefit).forEach(key => {
      if (benefit[key] !== 0) {
        customerBenefit.push([EVENT[key], benefit[key]]);
      }
    });

    return customerBenefit;
  }

  calculateTotalBenefit() {
    return Object.values(benefit).reduce((acc, value) => acc + value, 0);
  }

  calculateTotalPay() {
    return this.#totalOrder - this.calculateTotalDiscount();
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

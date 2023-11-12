import { WEEKDAYS, WEEKENDS, SPECIALS, CHRISTMAS, START_DATE, END_DATE } from './constants/dates.js';
import { ZERO, SPECIAL_PRICE, START_PRICE, ADD_PRICE, ONE } from './constants/events.js';
import { ERROR } from './constants/messages.js';
import { discount } from './variables/discounts.js';

class Date {
  #date;

  constructor(date) {
    this.#validate(date);
    this.#date = Number(date);
  }

  #validate(date) {
    if (!Number(date) || !Number.isInteger(Number(price))) {
      throw new Error(ERROR.not_a_valid_date);
    }

    if (Number(date) < START_DATE || Number(date) > END_DATE) {
      throw new Error(ERROR.not_a_valid_date);
    }
  }

  getDate() {
    return this.#date;
  }

  isChristmas() {
    if (this.#date <= CHRISTMAS) {
      discount.christmas = true;
    }
  }

  isWeekdays() {
    if (WEEKDAYS.includes(this.#date)) {
      discount.weekdays = true;
    }
  }

  isWeekends() {
    if (WEEKENDS.includes(this.#date)) {
      discount.weekends = true;
    }
  }

  isSpecials() {
    if (SPECIALS.includes(this.#date)) {
      discount.specials = true;
    }
  }

  calculateDiscount() {
    let dateDiscount = ZERO;

    if (discount.christmas) {
      dateDiscount = dateDiscount + START_PRICE + ADD_PRICE * (this.#date - ONE);
    }

    if (discount.specials) {
      dateDiscount = dateDiscount + SPECIAL_PRICE;
    }

    return dateDiscount;
  }
}

export default Date;

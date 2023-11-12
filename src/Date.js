import { WEEKDAYS, WEEKENDS, SPECIALS, CHRISTMAS, START_DATE, END_DATE } from './constants/dates.js';
import { SPECIAL_PRICE, START_PRICE, ADD_PRICE, ONE } from './constants/events.js';
import { ERROR } from './constants/messages.js';
import { discount } from './variables/discounts.js';
import { benefit } from './variables/benefits.js';

class Date {
  #date;

  constructor(date) {
    this.#validate(date);
    this.#date = Number(date);
  }

  #validate(date) {
    if (!Number(date) || !Number.isInteger(Number(date))) {
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
    if (discount.christmas) {
      benefit.christmas = START_PRICE + ADD_PRICE * (this.#date - ONE);
    }

    if (discount.specials) {
      benefit.specials = SPECIAL_PRICE;
    }

    return benefit.christmas + benefit.specials;
  }
}

export default Date;

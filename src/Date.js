import { WEEKDAYS, WEEKENDS, SPECIALS, CHRISTMAS, START_DATE, END_DATE } from './constants/dates.js';
import { ERROR } from './constants/messages.js';

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

  

}

export default Date;

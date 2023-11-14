import { ZERO } from './constants/events.js';
import { benefit } from './variables/benefits.js';
import { discount } from './variables/discounts.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';
import Event from './Event.js';

class App {
  #event;

  async run() {
    this.initializeDiscount();
    this.initializeBenefit();
    OutputView.printGreeting();

    const { date, dateDiscount } = await this.makeDate();
    const { order, totalOrder, menuDiscount, free } = await this.makeOrder();
    
    this.#event = new Event(totalOrder);
    const totalDiscount = this.#event.calculateTotalDiscount(dateDiscount, menuDiscount);

    this.printResult(date, order);
  }

  initializeDiscount() {
    Object.keys(discount).forEach(key => {
      discount[key] = false;
    });
  }

  initializeBenefit() {
    Object.keys(benefit).forEach(key => {
      benefit[key] = ZERO;
    });
  }

  async makeDate() {
    const date = await InputView.enterDate();
    date.isChristmas();
    date.isWeekdays();
    date.isWeekends();
    date.isSpecials();
    const dateDiscount = date.calculateDiscount();

    return { date, dateDiscount };
  }

  async makeOrder() {
    const order = await InputView.enterOrder();
    const totalOrder = order.calculateTotalOrder();
    const menuDiscount = order.calculateDiscount();
    const free = order.calculateFree();

    return { order, totalOrder, menuDiscount, free };
  }

  printResult(date, order) {
    OutputView.printPreview(date.getDate());
    OutputView.printOrder(order.getOrders());
    OutputView.printTotalOrder(this.#event.getTotalOrder());
    OutputView.printFree(this.#event.showFree());
    OutputView.printBenefit(this.#event.showBenefit());
    OutputView.printTotalBenefit(this.#event.calculateTotalBenefit());
    OutputView.printTotalPay(this.#event.calculateTotalPay());
    OutputView.printBadge(this.#event.awardBadge());
  }
}

export default App;

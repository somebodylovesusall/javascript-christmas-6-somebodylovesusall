import { ZERO } from './constants/events.js';
import { benefit } from './variables/benefits.js';
import { discount } from './variables/discounts.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';
import Event from './Event.js';

class App {
  async run() {
    this.initializeDiscount();
    this.initializeBenefit();
    OutputView.printGreeting();

    const { date, dateDiscount } = await this.makeDate();
    const { order, totalOrder, menuDiscount, free } = await this.makeOrder();
    const event = new Event(totalOrder);
    const totalDiscount = event.calculateTotalDiscount(dateDiscount, menuDiscount);

    OutputView.printPreview(date.getDate());
    OutputView.printOrder(order.getOrders());
    OutputView.printTotalOrder(totalOrder);
    OutputView.printFree(event.showFree());
    OutputView.printBenefit(event.showBenefit());
    OutputView.printTotalBenefit(event.calculateTotalBenefit());
    OutputView.printTotalPay(event.calculateTotalPay());
    OutputView.printBadge(event.awardBadge());
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
}

// const app = new App();
// app.run();

export default App;

import { MissionUtils } from '@woowacourse/mission-utils';
import { COUNT, DECEMBER, KO_KR, LINE_BREAK, OUTPUT, WON, MINUS } from '../constants/messages.js';
import { ZERO, ONE, DEFAULT } from '../constants/events.js';

const OutputView = {
  printGreeting() {
    MissionUtils.Console.print(OUTPUT.greeting);
  },

  printPreview(date)  {
    MissionUtils.Console.print(`${DECEMBER}${date}${OUTPUT.preview}${LINE_BREAK}`);
  },

  printOrder(orders) {
    const ordersList = Object.entries(orders).map(([key, value]) => [key, value]);
    const ordersResult = [];
    ordersList.forEach(order => {
      ordersResult.push(`${order[ZERO]} ${order[ONE]}${COUNT}`);
    });

    MissionUtils.Console.print(`${OUTPUT.order}${LINE_BREAK}${ordersResult.join(LINE_BREAK)}${LINE_BREAK}`);
  },

  printTotalOrder(totalOrder) {
    MissionUtils.Console.print(`${OUTPUT.total_order}${LINE_BREAK}${totalOrder.toLocaleString(KO_KR)}${WON}${LINE_BREAK}`);
  },

  printFree(free) {
    MissionUtils.Console.print(`${OUTPUT.free}${LINE_BREAK}${free}${LINE_BREAK}`);
  },
  
  printBenefit(benefit) {
    if (benefit === DEFAULT) {
      MissionUtils.Console.print(`${OUTPUT.benefit}${LINE_BREAK}${benefit}${LINE_BREAK}`);
      return;
    }

    const benefitResult = [];
    benefit.forEach(item => {
      benefitResult.push(`${item[ZERO]}${MINUS}${item[ONE].toLocaleString(KO_KR)}${WON}`);
    });

    MissionUtils.Console.print(`${OUTPUT.benefit}${LINE_BREAK}${benefitResult.join(LINE_BREAK)}${LINE_BREAK}`);
  },

  printTotalBenefit(totalBenefit) {
    if (totalBenefit === ZERO) {
      MissionUtils.Console.print(`${OUTPUT.total_benefit}${LINE_BREAK}${ZERO}${WON}${LINE_BREAK}`);
      return;
    }

    MissionUtils.Console.print(`${OUTPUT.total_benefit}${LINE_BREAK}${MINUS}${totalBenefit.toLocaleString(KO_KR)}${WON}${LINE_BREAK}`);
  },

  printTotalPay(totalPay) {
    MissionUtils.Console.print(`${OUTPUT.total_pay}${LINE_BREAK}${totalPay.toLocaleString(KO_KR)}${WON}${LINE_BREAK}`);
  },

  printBadge(badge) {
    MissionUtils.Console.print(`${OUTPUT.badge}${LINE_BREAK}${badge}`);
  },
}

export default OutputView;

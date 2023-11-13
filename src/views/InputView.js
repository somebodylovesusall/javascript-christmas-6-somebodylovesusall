import { MissionUtils } from '@woowacourse/mission-utils';
import { COMMA, INPUT, LINE_BREAK } from '../constants/messages.js';
import Date from '../Date.js';
import Order from '../Order.js';

const InputView = {
  async enterDate() {
    try {
      const input = await MissionUtils.Console.readLineAsync(`${INPUT.date}${LINE_BREAK}`);
      const date = new Date(input);

      return date;
    } catch (error) {
      MissionUtils.Console.print(error.message);
      return this.enterDate();
    }
  },
  
  async enterOrder() {
    try {
      const input = await MissionUtils.Console.readLineAsync(`${INPUT.order}${LINE_BREAK}`);
      const order = new Order(input.split(COMMA));

      return order;
    } catch (error) {
      MissionUtils.Console.print(error.message);
      return this.enterOrder();
    }
  },
}

await InputView.enterDate();
await InputView.enterOrder();

export default InputView;

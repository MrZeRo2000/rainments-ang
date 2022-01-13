import { PaymentGroupAmountSummary } from './payment-group-amount-summary';
import {PaymentGroup} from './payment-group';

describe('PaymentGroupAmountSummary', () => {
  it('should create an instance', () => {
    expect(new PaymentGroupAmountSummary(new PaymentGroup(1, 'Group 1'), 12.2, 0.3)).toBeTruthy();
  });
});

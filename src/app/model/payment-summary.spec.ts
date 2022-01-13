import { PaymentGroupAmountSummary } from './payment-group-amount-summary';

describe('PaymentSummary', () => {
  it('should create an instance', () => {
    expect(new PaymentGroupAmountSummary('Group 1', 12.2, 0.3)).toBeTruthy();
  });
});

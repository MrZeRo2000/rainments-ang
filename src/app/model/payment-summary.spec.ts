import { PaymentSummary } from './payment-summary';

describe('PaymentSummary', () => {
  it('should create an instance', () => {
    expect(new PaymentSummary('Group 1', 12.2, 0.3)).toBeTruthy();
  });
});

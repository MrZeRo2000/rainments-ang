import { PaymentUtils } from './payment-utils';
import {Payment} from '../model/payment';
import {PaymentObject} from '../model/payment-object';
import {Product} from '../model/product';
import {PaymentGroup} from '../model/payment-group';
import {PaymentAmountSummary} from '../model/payment-amount-summary';

describe('PaymentUtils', () => {
  const paymentObject1 = new PaymentObject(1, 'Object 1');
  const paymentObject2 = new PaymentObject(2, 'Object 2');

  const paymentGroup1 = new PaymentGroup(1, 'Group 1');
  const paymentGroup2 = new PaymentGroup(2, 'Group 2');

  const product1 = new Product(1, 'Product 1');
  const product2 = new Product(2, 'Product 2');

  const date1 = new Date(2020, 0, 1);
  const date2 = new Date(2020, 1, 1);

  const testPayments: Array<Payment> = [
    new Payment(1, date1, date1, paymentObject1, paymentGroup1, product1, 0, 12.5, 0.3),
    new Payment(2, date1, date1, paymentObject1, paymentGroup1, product2, 0, 2.5, 0.1),
    new Payment(3, date1, date1, paymentObject1, paymentGroup2, product1, 0, 3.1, 0.2),
    new Payment(4, date1, date1, paymentObject1, paymentGroup2, product2, 0, 7.8, 0.24)
  ];

  it('calcPaymentAmountSummary', () => {
    const summary: PaymentAmountSummary = PaymentUtils.calcPaymentAmountSummary(testPayments);
    expect(summary.paymentAmount).toBeCloseTo(12.5+2.5+3.1+7.8);
    expect(summary.commissionAmount).toBeCloseTo(0.3+0.1+0.2+0.24);
  });

  const groups = ['periodDate', 'paymentObject', 'paymentGroup', 'product'];

});

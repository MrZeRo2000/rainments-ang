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
    new Payment(3, date2, date2, paymentObject1, paymentGroup2, product1, 0, 3.1, 0.2),
    new Payment(4, date2, date2, paymentObject1, paymentGroup2, product2, 0, 7.8, 0.24)
  ];
  const totals = testPayments.reduce(
    (a, v) => {
      a[0] = a[0] + v.paymentAmount; a[1] = a[1] + v.commissionAmount; return a;
      }, [0, 0]
  );

  it('totals', () => {
    expect(totals[0]).toBeCloseTo(12.5+2.5+3.1+7.8);
    expect(totals[1]).toBeCloseTo(0.3+0.1+0.2+0.24);
  });

  it('calcPaymentAmountSummary', () => {
    const summary: PaymentAmountSummary = PaymentUtils.calcPaymentAmountSummary(testPayments);
    expect(summary.paymentAmount).toBeCloseTo(totals[0]);
    expect(summary.commissionAmount).toBeCloseTo(totals[1]);
  });

  const groups = ['periodDate', 'paymentObject', 'paymentGroup', 'product'];

  const groupKeys1 = ['periodDate', 'paymentObject'];
  it ('groupBy ' + JSON.stringify(groupKeys1), () => {
    const result = PaymentUtils.groupBy(testPayments, groupKeys1);
    console.log('test1:' + JSON.stringify(result));
    const totalPaymentAmount = result.reduce((a, v) => a + v.paymentAmount, 0);
    const totalCommissionAmount = result.reduce((a, v) => a + v.commissionAmount, 0);
    expect(totalPaymentAmount).toBeCloseTo(totals[0]);
    expect(totalCommissionAmount).toBeCloseTo(totals[1]);
    expect(result.length).toBe(2);
    expect(result[0].paymentGroup).toBeUndefined();
    expect(result[0].product).toBeUndefined();
    expect(result[0].periodDate).toEqual(date1);
    expect(result[1].periodDate).toEqual(date2);
    expect(JSON.stringify(result[0].paymentObject)).toBe(JSON.stringify(paymentObject1));
    expect(JSON.stringify(result[1].paymentObject)).toBe(JSON.stringify(paymentObject1));
  });

  const groupKeys2 = ['paymentObject'];
  it ('groupBy ' + JSON.stringify(groupKeys2), () => {
    const result = PaymentUtils.groupBy(testPayments, groupKeys2);
    console.log('test2:' + JSON.stringify(result));
    expect(result.length).toBe(1);
    expect(result[0].paymentGroup).toBeUndefined();
    expect(result[0].product).toBeUndefined();
    expect(result[0].periodDate).toBeUndefined();
    expect(JSON.stringify(result[0].paymentObject)).toBe(JSON.stringify(paymentObject1));
  });

  const groupKeys3 = [];
  it ('groupBy ' + JSON.stringify(groupKeys3), () => {
    const result = PaymentUtils.groupBy(testPayments, groupKeys3);
    console.log('test3:' + JSON.stringify(result));
    expect(result.length).toBe(1);
    expect(result[0].paymentObject).toBeUndefined();
    expect(result[0].paymentGroup).toBeUndefined();
    expect(result[0].product).toBeUndefined();
    expect(result[0].periodDate).toBeUndefined();
    expect(result[0].paymentAmount).toBeCloseTo(totals[0]);
    expect(result[0].commissionAmount).toBeCloseTo(totals[1]);
  });

});

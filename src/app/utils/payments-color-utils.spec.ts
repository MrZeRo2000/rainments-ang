import {PaymentsColorUtils} from './payments-color-utils';
import {PaymentObject} from '../model/payment-object';
import {PaymentGroup} from '../model/payment-group';
import {Product} from '../model/product';
import {Payment} from '../model/payment';
import * as d3 from 'd3';

describe('PaymentsColorUtils', () => {
  const paymentObject1 = new PaymentObject(1, 'Object 1');

  const paymentGroup1 = new PaymentGroup(1, 'Group 1', null, '#ff0000');
  const paymentGroup2 = new PaymentGroup(2, 'Group 2', null, '#00ff00');
  const paymentGroup3 = new PaymentGroup(3, 'Group 3');
  const paymentGroup4 = new PaymentGroup(4, 'Group 4');

  const product1 = new Product(1, 'Product 1');
  const product12 = new Product(12, 'Product 12');
  const product2 = new Product(2, 'Product 2');
  const product21 = new Product(21, 'Product 21');
  const product3 = new Product(3, 'Product 3');
  const product4 = new Product(4, 'Product 4');

  const date1 = new Date(2020, 0, 1);
  const date11 = new Date(2020, 0, 1);
  const date12 = new Date(2020, 0, 1);
  const date2 = new Date(2020, 1, 1);
  const date21 = new Date(2020, 1, 1);
  const date22 = new Date(2020, 1, 1);

  const testPayments: Array<Payment> = [
    new Payment(5, date21, date21, paymentObject1, paymentGroup3, product3, 0, 2.8, 0.0),
    new Payment(6, date22, date22, paymentObject1, paymentGroup4, product4, 0, 1.5, 0.0),
    new Payment(1, date1, date1, paymentObject1, paymentGroup1, product1, 0, 12.5, 0.3),
    new Payment(2, date11, date11, paymentObject1, paymentGroup1, product12, 0, 3.2, 0.1),
    new Payment(3, date12, date12, paymentObject1, paymentGroup2, product2, 0, 2.5, 0.1),
    new Payment(4, date2, date2, paymentObject1, paymentGroup2, product2, 0, 3.1, 0.2),
  ];

  it('should create an instance', () => {
    expect(new PaymentsColorUtils()).toBeTruthy();
  });

  it('working validation', () => {
    const result = PaymentsColorUtils.calcPaymentColorsTotals(testPayments);

    expect(result).toBeDefined();

    expect(result.colors).toEqual(['#ff0000', '#00ff00', '']);

    expect(result.paymentColorsTotals.length).toBe(2);

    expect(result.paymentColorsTotals[0].periodDate).toEqual(new Date(2020, 0, 1));
    expect(result.paymentColorsTotals[0].amount).toBe(12.5+0.3+3.2+0.1+2.5+0.1);

    expect(result.paymentColorsTotals[0].colorAmounts[0].amount).toBe(12.5+0.3+3.2+0.1);
    expect(result.paymentColorsTotals[0].colorAmounts[0].prevAmount).toBe(0);
    expect(result.paymentColorsTotals[0].colorAmounts[0].nextAmount).toBe(12.5+0.3+3.2+0.1);

    expect(result.paymentColorsTotals[0].colorAmounts[1].amount).toBe(2.5+0.1);
    expect(result.paymentColorsTotals[0].colorAmounts[1].prevAmount).toBe(12.5+0.3+3.2+0.1);
    expect(result.paymentColorsTotals[0].colorAmounts[1].nextAmount).toBe(12.5+0.3+3.2+0.1+2.5+0.1);

    expect(result.paymentColorsTotals[0].colorAmounts[2].amount).toBe(0);
    expect(result.paymentColorsTotals[0].colorAmounts[2].prevAmount).toBe(12.5+0.3+3.2+0.1+2.5+0.1);
    expect(result.paymentColorsTotals[0].colorAmounts[2].nextAmount).toBe(12.5+0.3+3.2+0.1+2.5+0.1);

    expect(Math.max(...[].concat(...result.paymentColorsTotals.map(v => v.colorAmounts.map(v => v.amount))))).toBe(12.5+0.3+3.2+0.1)

    const d3 = require('d3');
    expect(d3.max([].concat(...result.paymentColorsTotals.map(v => v.colorAmounts.map(v => v.amount))))).toBe(12.5+0.3+3.2+0.1);

  });


});

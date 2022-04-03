import {Payment} from '../model/payment';

export interface PaymentColorTotal {
  periodDate: Date,
  color: string,
  paymentAmount: number;
}

interface GroupKey {
  periodDate: Date,
  color: string
}

interface GroupAmount {
  [groupKeyStr: string] : number,
  paymentAmount: number
}

interface GroupColorAmount {
  [color: string] : number,
  paymentAmount: number
}

export interface ColorNames {
  [color: string]: string
}

export interface ColorAmount {
  amount: number,
  prevAmount: number,
  nextAmount: number
}

export interface PaymentColorsTotal {
  periodDate: Date,
  amount: number;
  colorAmounts: Array<ColorAmount>;
}

export interface PaymentColorsResult {
  paymentColorsTotals: Array<PaymentColorsTotal>;
  colors: Array<string>;
  colorNames: ColorNames;
}

export class PaymentsColorUtils {
  static calcPaymentColorsTotals(payments: Array<Payment>): PaymentColorsResult {

    const groupAmount: any = {} as GroupAmount;
    const periodDates = new Set<number>();

    payments.forEach(p => {
      if (!periodDates.has(p.periodDate.getTime())) {
        periodDates.add(p.periodDate.getTime());
      }
      const groupKey: GroupKey = {periodDate: p.periodDate, color: p.paymentGroup?.color || ''}
      const groupKeyStr = JSON.stringify(groupKey);
      if (groupAmount[groupKeyStr]) {
        groupAmount[groupKeyStr] += p.paymentAmount + p.commissionAmount;
      } else {
        groupAmount[groupKeyStr] = p.paymentAmount + p.commissionAmount;
      }
    });

    const colorNames: ColorNames = [
      ...new Set(payments.map(v => (JSON.stringify({color:v.paymentGroup.color || '', name: v.paymentGroup.name}))))
    ]
      .map(v => JSON.parse(v))
      .reduce((a,v) => {if (!!a[v.color]) {a[v.color] = a[v.color] + ',' + v.name} else {a[v.color] = v.name;} return a;}, {})

    //[...new Set(payments.map(v => ({color:v.paymentGroup.color || '', name: v.paymentGroup.name})))].reduce((a,v) => {if (!!a[v.color]) {a[v.color] = a[v.color] + ',' + v.name} else {a[v.color] = v.name;} return a;}, {})

    const groupColorAmount = Object.keys(groupAmount).reduce(
      (a, v) => {
        const vc: GroupKey = JSON.parse(v);
        if (a[vc.color]) {
          if (a[vc.color] < groupAmount[v]) {
            a[vc.color] = groupAmount[v];
          }
        } else {
          a[vc.color] = groupAmount[v];
        }
        return a;
      },
      {} as GroupColorAmount
    )

    const sortedColors = Object.entries(groupColorAmount)
      .sort((a,b) => {
        if (a[0] == '') {
          return 1;
        }
        else if (b[0] == '') {
          return -1;
        }
        else {
          return b[1] - a[1];
        }
      }
      ).map(v => v[0]);

    const periodDatesArray = [...periodDates.values()].sort((a, b) => {if (a > b) {return 1;} else if (b > a) {return -1;} else {return 0;}});

    const yz: Array<Array<number>> = Array(sortedColors.length).fill(0).map(() => Array(periodDatesArray.length).fill(0));

    periodDatesArray.forEach((d, di) => {
      sortedColors.forEach((c, ci) => {
        const groupKey: GroupKey = {periodDate: new Date(d), color: c}
        const groupKeyStr = JSON.stringify(groupKey);
        const ga = groupAmount[groupKeyStr];
        if (ga) {
          yz[ci][di] = ga;
        }
      })
    });

    const paymentColorsTotals: Array<PaymentColorsTotal> = new Array<PaymentColorsTotal>();

    periodDatesArray.forEach((d, di) => {

      const paymentColorsTotal: PaymentColorsTotal = {periodDate: new Date(d), amount: 0, colorAmounts: []} as PaymentColorsTotal;

      let colorAmount: ColorAmount = {amount: 0, prevAmount: paymentColorsTotal.amount, nextAmount: paymentColorsTotal.amount};
      sortedColors.forEach((c, ci) => {
        if (ci !== 0) {
          colorAmount = Object.assign({}, {amount: 0, prevAmount: paymentColorsTotal.amount, nextAmount: paymentColorsTotal.amount});
        }

        const groupKey: GroupKey = {periodDate: new Date(d), color: c}
        const groupKeyStr = JSON.stringify(groupKey);
        const ga = groupAmount[groupKeyStr];
        if (ga) {
          const gar = Math.round(ga * 100)/100;
          colorAmount.amount = gar;
          colorAmount.nextAmount = colorAmount.prevAmount + colorAmount.amount;
          paymentColorsTotal.amount += gar;
        }

        paymentColorsTotal.colorAmounts.push(Object.assign({}, colorAmount));
      });

      paymentColorsTotals.push(paymentColorsTotal);
    });

    return {colors: sortedColors, paymentColorsTotals, colorNames};
  }
}

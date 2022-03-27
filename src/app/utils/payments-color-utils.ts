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


export class PaymentsColorUtils {
  static calcPaymentColors(payments: Array<Payment>): void {

    const groupAmount: any = {} as GroupAmount;
    const periodDates = new Set<Date>();

    payments.forEach(p => {
      if (!periodDates.has(p.periodDate)) {
        periodDates.add(p.periodDate);
      }
      const groupKey: GroupKey = {periodDate: p.periodDate, color: p.paymentGroup?.color || ''}
      const groupKeyStr = JSON.stringify(groupKey);
      if (groupAmount[groupKeyStr]) {
        groupAmount[groupKeyStr] += p.paymentAmount + p.commissionAmount;
      } else {
        groupAmount[groupKeyStr] = p.paymentAmount + p.commissionAmount;
      }
    });

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

    const v: any = Array(sortedColors.length).fill(0).map(() => Array(periodDatesArray.length).fill(0));

    periodDatesArray.forEach((d, di) => {
      sortedColors.forEach((c, ci) => {
        const groupKey: GroupKey = {periodDate: d, color: c}
        const groupKeyStr = JSON.stringify(groupKey);
        const ga = groupAmount[groupKeyStr];
        if (ga) {
          v[ci][di] = ga;
        }
      })
    })

    const z: any = [];
  }
}

export class PaymentSummary {
  private mPaymentAmount: number;
  private mCommissionAmount: number;

  constructor(public groupName: string, paymentAmount: number, commissionAmount: number) {
    this.mPaymentAmount = paymentAmount;
    this.mCommissionAmount = commissionAmount;
  }

  public get paymentAmount(): number {
    return Math.round(this.mPaymentAmount * 100) / 100;
  }

  public get commissionAmount(): number {
    return Math.round(this.mCommissionAmount * 100) / 100;
  }

  public addAmounts(paymentAmount: number, commissionAmount: number) {
    this.mPaymentAmount += paymentAmount;
    this.mCommissionAmount += commissionAmount;
  }
}

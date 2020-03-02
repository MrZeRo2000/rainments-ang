export class PaymentSummary {
  constructor(public groupName: string, public paymentAmount: number, public commissionAmount: number) { }

  public addAmounts(paymentAmount: number, commissionAmount: number) {
    this.paymentAmount += paymentAmount;
    this.commissionAmount += commissionAmount;
  }
}

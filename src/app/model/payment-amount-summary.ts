export class PaymentAmountSummary {
  constructor(public paymentAmount: number, public commissionAmount: number) { }

  public addAmounts(paymentAmount: number, commissionAmount: number): PaymentAmountSummary {
    this.paymentAmount += paymentAmount;
    this.commissionAmount += commissionAmount;
    return this;
  }

  public toString(): string {
    return `PaymentAmountSummary (${this.paymentAmount.toFixed(2)}, ${this.commissionAmount.toFixed(2)})`;
  }
}

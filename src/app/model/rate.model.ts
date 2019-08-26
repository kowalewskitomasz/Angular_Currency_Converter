export class Rate {
  currency: string;
  code: string;
  mid: number;
  effectiveDate: Date;

  constructor(currency: string, code: string, mid: number, effectiveDate: Date) {
    this.currency = currency;
    this.code = code;
    this.mid = mid;
    this.effectiveDate = effectiveDate;
  }
}

export class Rate {
  currency: String;
  code: String;
  mid: Number;

  constructor(currency: String, code: String, mid: Number) {
    this.currency = currency;
    this.code = code;
    this.mid = mid;
  }
}

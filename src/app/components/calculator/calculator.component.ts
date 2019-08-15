import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Exchange} from '../../model/exchange.model';
import {Rate} from '../../model/rate.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  exchangeTable: Exchange;
  rateTable: Rate[];
  valueFirstCurrency: Number = 100;
  valueSecondCurrency: Number;
  rateFirstCurrency: Number;
  rateSecondCurrency: Number;

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.http.getCurrencies().subscribe(exchangeNBP => {
      this.exchangeTable = exchangeNBP[0];
      this.rateTable = this.exchangeTable.rates;
      this.rateFirstCurrency = this.rateTable[0].mid;
      this.rateSecondCurrency = this.rateTable[1].mid;
      this.updateValuesLeft();
    });
  }

  updateValuesLeft() {
    this.valueSecondCurrency = ((+this.valueFirstCurrency * this.rateFirstCurrency.valueOf()) / this.rateSecondCurrency.valueOf());
  }

  updateValuesRight() {
    this.valueFirstCurrency = ((+this.valueSecondCurrency * this.rateSecondCurrency.valueOf()) / this.rateFirstCurrency.valueOf());
  }

  onLeftCurrencyKey($event: KeyboardEvent) {
    this.updateValuesLeft();
  }

  onRightCurrencyKey($event: KeyboardEvent) {
    this.updateValuesRight();
  }
}

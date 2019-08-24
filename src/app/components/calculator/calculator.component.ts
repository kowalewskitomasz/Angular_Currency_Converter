import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Exchange} from '../../model/exchange.model';
import {Rate} from '../../model/rate.model';
import {ChartConfig} from '../../model/chartconfig.model';

export enum Period {
  WEEK = 7,
  MONTH = 30,
  MONTH3 = 90,
  MONTH6 = 180,
  YEAR = 365
}

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
  firstCurrency: Rate;
  secondCurrency: Rate;
  Period = Period;
  dateOfUpdate: Date;
  chartConfig = new ChartConfig();

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.http.getCurrencies().subscribe(exchangeNBP => {
      const plnCurrency = new Rate('polski złoty', 'PLN', 1);
      this.exchangeTable = exchangeNBP[0];
      this.dateOfUpdate = this.exchangeTable.effectiveDate;
      this.exchangeTable.rates.unshift(plnCurrency);
      this.rateTable = this.exchangeTable.rates;
      this.firstCurrency = this.rateTable[0];
      this.secondCurrency = this.rateTable[1];
      this.updateValuesLeft();
    });
  }

  updateValuesLeft() {
    this.valueSecondCurrency = ((+this.valueFirstCurrency * this.firstCurrency.mid.valueOf()) / this.secondCurrency.mid.valueOf());
  }

  updateValuesRight() {
    this.valueFirstCurrency = ((+this.valueSecondCurrency * this.secondCurrency.mid.valueOf()) / this.firstCurrency.mid.valueOf());
  }

  switchCurrencies() {
    const tempRateFirstCurrency = this.firstCurrency;
    this.firstCurrency = this.secondCurrency;
    this.secondCurrency = tempRateFirstCurrency;
    this.updateValuesLeft();
  }

  updateChart(period: Period) {
    if (this.firstCurrency.code !== 'PLN') {
      this.http.getRatesForPeriod(period, this.firstCurrency.code).subscribe(rates1 => {
        console.log(rates1);

        if (this.secondCurrency.code !== 'PLN') {
          this.http.getRatesForPeriod(period, this.secondCurrency.code).subscribe(rates2 => {
            console.log(rates2);
          });
        }
      });
    }
  }
}

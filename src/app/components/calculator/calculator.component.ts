import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Exchange} from '../../model/exchange.model';
import {Rate} from '../../model/rate.model';
import {ChartConfig} from '../../model/chartconfig.model';
import {Rates} from '../../model/rates.model';

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
  globalPeriod: Period;

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.http.getCurrencies().subscribe(exchangeNBP => {
      const plnCurrency = new Rate('polski złoty', 'PLN', 1, null);
      this.exchangeTable = exchangeNBP[0];
      this.dateOfUpdate = this.exchangeTable.effectiveDate;
      this.exchangeTable.rates.unshift(plnCurrency);
      this.rateTable = this.exchangeTable.rates;
      this.firstCurrency = this.rateTable[0];
      this.secondCurrency = this.rateTable[1];
      this.updateValuesLeft();
      this.configureChart();
    });
  }

  updateValuesLeft() {
    this.valueSecondCurrency = ((+this.valueFirstCurrency * this.firstCurrency.mid.valueOf()) / this.secondCurrency.mid.valueOf());
  }

  updateValuesRight() {
    this.valueFirstCurrency = ((+this.valueSecondCurrency * this.secondCurrency.mid.valueOf()) / this.firstCurrency.mid.valueOf());
  }

  updateBothValuesAndChart() {
    this.updateValuesLeft();
    this.updateValuesRight();
    this.configureChart();
  }

  switchCurrencies() {
    const tempRateFirstCurrency = this.firstCurrency;
    this.firstCurrency = this.secondCurrency;
    this.secondCurrency = tempRateFirstCurrency;
    this.updateValuesLeft();
    this.configureChart();
  }

  configureChart(period?: Period) {
    if (this.globalPeriod == null) {
      this.globalPeriod = Period.MONTH3;
    } else if (period != null) {
      this.globalPeriod = period;
    }

    if (this.firstCurrency.code === 'PLN' || this.secondCurrency.code === 'PLN') {
      console.log('polish zloty ERROR!');
      return;
    }

    this.http.getRatesForPeriod(this.globalPeriod, this.firstCurrency.code).subscribe(series1 => {
      this.http.getRatesForPeriod(this.globalPeriod, this.secondCurrency.code).subscribe(series2 => {
        const firstRateTable: Rates = series1.rates;
        const secondRateTable: Rates = series2.rates;

        const resultMidData: number[] = [];
        const resultDateData: string[] = [];

        for (let i = 0; i < Object.keys(firstRateTable).length; i++) {
          resultMidData.push(firstRateTable[i].mid / secondRateTable[i].mid);
          resultDateData.push(firstRateTable[i].effectiveDate);
        }

        this.chartConfig.lineChartData = [
          {
            data: resultMidData,
            label: this.firstCurrency.code + ' to ' + this.secondCurrency.code,
            yAxisID: 'y-axis-0'
          }
        ];

        this.chartConfig.lineChartLabels = resultDateData;
      });
    });
  }
}

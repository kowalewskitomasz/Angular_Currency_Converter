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

    const resultMidData: number[] = [];
    const resultDateData: string[] = [];

    if (this.firstCurrency.code !== 'PLN' && this.secondCurrency.code !== 'PLN') {
      this.retrieveDataForNonPlnCurrencies(resultMidData, resultDateData);
    } else if (this.firstCurrency.code !== 'PLN' && this.secondCurrency.code === 'PLN') {
      this.retrieveDataWhenOneOfCurrenciesIsNotPln(resultMidData, resultDateData, this.firstCurrency);
    } else if (this.firstCurrency.code === 'PLN' && this.secondCurrency.code !== 'PLN') {
      this.retrieveDataWhenOneOfCurrenciesIsNotPln(resultMidData, resultDateData, this.secondCurrency);
    } else if (this.firstCurrency.code === 'PLN' && this.secondCurrency.code === 'PLN') {
      this.retrieveDataWhenBothCurrenciesArePln(resultMidData, resultDateData);
    }

    this.updateDataInChart(resultMidData, resultDateData, this.firstCurrency.code, this.secondCurrency.code);
  }

  private retrieveDataWhenBothCurrenciesArePln(resultMidData: number[], resultDateData: string[]) {
    this.http.getRatesForPeriod(this.globalPeriod, 'EUR').subscribe(series => {
      const rateTable: Rates = series.rates;

      for (let i = 0; i < Object.keys(rateTable).length; i++) {
        resultMidData.push(1);
        resultDateData.push(rateTable[i].effectiveDate);
      }
    });
  }

  private retrieveDataWhenOneOfCurrenciesIsNotPln(resultMidData: number[], resultDateData: string[], currency: Rate) {
    this.http.getRatesForPeriod(this.globalPeriod, currency.code).subscribe(series => {
      const rateTable: Rates = series.rates;

      if (this.firstCurrency.code === 'PLN') {
        for (let i = 0; i < Object.keys(rateTable).length; i++) {
          resultMidData.push(1 / rateTable[i].mid);
          resultDateData.push(rateTable[i].effectiveDate);
        }
      } else if (this.secondCurrency.code === 'PLN') {
        for (let i = 0; i < Object.keys(rateTable).length; i++) {
          resultMidData.push(rateTable[i].mid / 1);
          resultDateData.push(rateTable[i].effectiveDate);
        }
      }
    });
  }

  private retrieveDataForNonPlnCurrencies(resultMidData: number[], resultDateData: string[]) {
    this.http.getRatesForPeriod(this.globalPeriod, this.firstCurrency.code).subscribe(series1 => {
      this.http.getRatesForPeriod(this.globalPeriod, this.secondCurrency.code).subscribe(series2 => {
        const firstRateTable: Rates = series1.rates;
        const secondRateTable: Rates = series2.rates;

        for (let i = 0; i < Object.keys(firstRateTable).length; i++) {
          resultMidData.push(firstRateTable[i].mid / secondRateTable[i].mid);
          resultDateData.push(firstRateTable[i].effectiveDate);
        }
      });
    });
  }

  private updateDataInChart(resultMidData: number[], resultDateData: string[], firstCurrencyCode: string, secondCurrencyCode: string) {
    this.chartConfig.lineChartData = [
      {
        data: resultMidData,
        label: firstCurrencyCode + ' to ' + secondCurrencyCode,
        yAxisID: 'y-axis-0'
      }
    ];

    this.chartConfig.lineChartLabels = resultDateData;
  }
}

import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

export class ChartConfig {
  private _lineChartData: ChartDataSets[] = [
    {data: [10, 20, 40, 60, 120, 30, 60], label: 'Wartosci', yAxisID: 'y-axis-0'},
  ];

  private _lineChartLabels: Label[] = ['dzien1', 'dzien2', 'dzien3', 'dzien4', 'dzien5', 'dzien6', 'dzien7'];
  private _lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ]
    },
    annotation: {},
  };


  get getLineChartData(): Chart.ChartDataSets[] {
    return this._lineChartData;
  }

  get getLineChartLabels(): Label[] {
    return this._lineChartLabels;
  }

  get getLineChartOptions(): Chart.ChartOptions & { annotation: any } {
    return this._lineChartOptions;
  }
}


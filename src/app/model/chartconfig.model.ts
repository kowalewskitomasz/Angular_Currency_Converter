import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

export class ChartConfig {
  lineChartData: ChartDataSets[] = [
    {data: [10, 20, 40, 60, 120, 30, 60], label: 'Wartości', yAxisID: 'y-axis-0'},
  ];

  lineChartLabels: Label[] = ['dzien1', 'dzien2', 'dzien3', 'dzien4', 'dzien5', 'dzien6', 'dzien7'];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
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
}


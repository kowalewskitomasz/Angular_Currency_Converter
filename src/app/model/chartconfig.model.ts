import {ChartDataSets, ChartOptions} from 'chart.js';
import {Colors, Label} from 'ng2-charts';

export class ChartConfig {
  lineChartData: ChartDataSets[] = [];

  lineChartLabels: Label[] = [];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        ticks: {fontColor: 'white'},
        gridLines: {color: 'rgba(255,255,255,0.1)'}
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {fontColor: 'white'},
          gridLines: {color: 'rgba(255,255,255,0.1)'}
        },
      ]
    },
    annotation: {},
  };

  lineChartColor: Colors[] = [
    {
      backgroundColor: 'rgba(77,83,96,0.6)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,0.8)'
    },
  ];
}


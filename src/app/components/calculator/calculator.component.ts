import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Exchange} from '../../model/exchange.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  exchangeTable: Exchange;

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.http.getCurrencies().subscribe(exchangeNBP => {
      this.exchangeTable = exchangeNBP[0];
    });
  }
}

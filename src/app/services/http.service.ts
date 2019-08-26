import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exchange} from '../model/exchange.model';
import {Observable} from 'rxjs';
import {ExchangeRateSeries} from '../model/exchangeratesseries.model';
import {Period} from '../components/calculator/calculator.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getCurrencies(): Observable<Exchange> {
    return this.http.get<Exchange>('http://api.nbp.pl/api/exchangerates/tables/A');
  }

  getRatesForPeriod(period: Period, currency: String): Observable<ExchangeRateSeries> {
    const todayDate = new Date();
    const calculatedDate = new Date();
    calculatedDate.setDate(todayDate.getDate() - period);

    return this.http.get<ExchangeRateSeries>('http://api.nbp.pl/api/exchangerates/rates/A/' + currency + '/' +
      calculatedDate.toISOString().substring(0, 10) + '/' + todayDate.toISOString().substring(0, 10));
  }
}

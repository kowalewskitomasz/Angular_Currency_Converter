import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exchange} from '../model/exchange.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getCurrencies(): Observable<Exchange> {
    return this.http.get<Exchange>('http://api.nbp.pl/api/exchangerates/tables/A');
  }
}

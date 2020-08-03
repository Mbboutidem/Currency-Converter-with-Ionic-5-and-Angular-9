import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const urlKey = environment.urlKey;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {
  
  constructor(private _http: HttpClient) { }
  getCountryCurr() {
    return this._http.get(`${urlKey}v7/currencies?apiKey=${apiKey}`).toPromise();            
}

getExchangeCurr(from: String, to: String){
    return this._http.get(`${urlKey}v7/convert?q=${from}_${to}&compact=y&apiKey=${apiKey}`).toPromise();
  }
  getCountryCurrt() {
    return this._http.get(`${urlKey}v7/currencies?apiKey=${apiKey}`);            
}

}

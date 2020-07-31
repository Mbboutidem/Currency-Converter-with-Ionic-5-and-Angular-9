import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const urlKey = environment.urlKey;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {
  API_KEY = '7488255780c23c61f7a6';
  constructor(private _http: HttpClient) { }
  getCountryCurr() {
    return this._http.get(`${urlKey}v7/currencies?apiKey=${apiKey}`).toPromise();            
}

getExchangeCurr(from: String, to: String){
    return this._http.get(`${urlKey}v7/convert?q=${from}_${to}&compact=y&apiKey=${apiKey}`).toPromise();    
}

  // getexchangeRate(from: string, to: string){
  //   return this._http.get(`${urlKey}v7/convert?q=${from}_${to}&compact=ultra&apiKey=${apiKey}`).toPromise();
  //    //${to}_${from
  // }
  // getcountryCurrencies(){
  //   return this._http.get(`${urlKey}v7/currencies?apiKey=${apiKey}`).toPromise(); 
  //   //promise will make use of async&wait.
  // }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const urlKey = environment.urlKey;

@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {

  constructor(private _http: HttpClient) { }

  getcountryCurrencies(){
    return this._http.get(`${urlKey}v7/currencies?apiKey=${apiKey}`).toPromise(); 
    //promise will make use of async&wait.
  }
  //
  getexchangeRate(from: string, to: string){
    return this._http.get(`${urlKey}v7/convert?q=${from}_${to},${to}_${from}&compact=ultra&apiKey=${apiKey}`).toPromise();
  }



}

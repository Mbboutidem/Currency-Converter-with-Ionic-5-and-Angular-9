import { Component } from '@angular/core';
import { CurrencyServiceService } from '../service/currency-service.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
 //properties
  fromCurr: any = 'USD';
  toCurr: any = 'NGN';
  _outputCurr: any;
  countryCodes =  [];
  countryNames = new Map();
  toValue: number;
  fromValue: any;

  constructor(private currencyserV: CurrencyServiceService) {}

  ngOnInit() {
    this.fetchCountries();
    this.setExchange();
  }

  /* An asynchronous function which retrieves 
  CountryCode List
  */
  async fetchCountries() {
    try {
      const res = await this.currencyserV.getCountryCurr();
      for (let x in res['results']) {
        this.countryCodes.push(x);
        this.countryNames.set(x, res['results'][x].currencyName);
      }
    } catch (err) {
      console.error(err);
    }
    console.log(this.countryNames);
  }

  async setExchange() {
    let from = this.fromCurr;
    let to = this.toCurr;
    try {
      const exchangeRate = await this.currencyserV.getExchangeCurr(from, to);
      let rate = exchangeRate[from + "_" + to].val;
      this._outputCurr = rate;
    }
    catch (err) {
      console.error(err);
    }
    console.log(this._outputCurr);
  }

  setCurrencyOne() {
    this.toValue = this.fromValue * parseFloat(this._outputCurr );
    console.log('Final Value: ' + this.toValue);
  }

  setCurrencyTwo() {
    this.fromValue = this.toValue / parseFloat(this._outputCurr);
    console.log('Final Value: ' + this.toValue);
  }
}
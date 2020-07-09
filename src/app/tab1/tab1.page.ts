import { Component } from '@angular/core';
import { CurrencyServiceService } from '../service/currency-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  //properties
  countryCodes: any = [];
  countryNames = new Map();
  //
  fromCurr: any = 'CZK';  //default values
  toCurr: any = 'NGN';
  resultValue: any;
  toValue: number;
  fromValue: number;

  constructor(private currencyserV: CurrencyServiceService) {}

  ngOnInit(){
    this.getcountryData();
    this.getexchangeRate();
  }

  // asynchronous function which get coountry code lists
  async getcountryData(){
    try{
    const data = await this.currencyserV.getcountryCurrencies();
    for(let x in data['results']){
      this.countryCodes.push(x);
      this.countryNames.set(x, data['results'][x].currencyName);
    }
  } catch (err) {
    console.log(err)
  }
  console.log(this.countryNames);
}
 async getexchangeRate(){
   let from = this.fromCurr;
   let to = this.toCurr;
   try{
  const exchange = await this.currencyserV.getexchangeRate(from, to);
  let rate = exchange[from + "_" + to].val;
  this.resultValue = rate;
   } catch(err){
    console.log(err);
  }
 }
 //function to calculate the end result
 evaluateCurrencyOne(){
   this.toValue = this.fromValue * parseFloat(this.resultValue);
 }
 evaluateCurrencyTwo(){
   this.fromValue = this.toValue / parseFloat(this.resultValue);
}


}

import { Component } from '@angular/core';
import { CurrencyServiceService } from '../service/currency-service.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  countryCodes = [];
  countryNames = new Map();
  fromBtc: any = "BTC";
  toBtc: any = "USD";
  _resultValue: any;
  fromValue: number;
  toValue: number;
  currentDate: Date;

  constructor(private currencyserV: CurrencyServiceService) 
  {this.currentDate = new Date();}

  ngOnInit(){
    this.fetchCountryData();
    this.fetchExchange();
    this.time();

  }
  time(){
    this.currencyserV.getCountryCurrt().subscribe(data =>{
      console.log(data);
    })
  }
   async fetchCountryData(){
     try {
      const resp = await this.currencyserV.getCountryCurr();
     for(let y in resp["results"]){
       this.countryCodes.push(y);
       this.countryNames.set(y, resp["results"][y].currencyName);
     }
    }catch (err){
      console.log(err)
    }
     console.log(this.countryNames);
  
  }
  async fetchExchange(){
    let btcFrom = this.fromBtc;
    let btcTo = this.toBtc
    const data = await this.currencyserV.getExchangeCurr(btcFrom, btcTo);
    let rate = data[btcFrom + "_"+ btcTo].val;
    this._resultValue = rate;
  }
  calculateFirstRate(){
    this.toValue = this.fromValue * parseFloat(this._resultValue);
  }
  calculateSecRate(){
    this.fromValue = this.toValue /parseFloat(this._resultValue);
  }

}
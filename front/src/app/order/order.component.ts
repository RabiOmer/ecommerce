import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  logged:any={
    user:null
  }
  user:any={
    phone:null
  }
  Today:any;

  billing:any;

  tempbill:any ={
    phone:null,
    date:null,
    city:null,
    street:null,
    card:null
  }
  PayPOP:boolean = false;
  week:any=[];
  err:any = null;

  UserCart:any= null;
  constructor(private api:ApiService,private router: Router) { 
    this.PayPOP = false;
    this.api.updateUserCart();
    this.logged.user = this.api.logged;
    this.UserCart= this.api.CartData;
    this.getDate()
    this.api.getBillingData().subscribe(
      res=>{
        if(res.success){
          this.billing = res.data;
        }
      }
    )
  }

  ngOnInit() {
  }

  getDate(){
    for(let i =0;i<8;i++){
    let date = new Date();
    let day = date.getDate() + 1 + i; 
    let Month =(date.getMonth() + 1);
    let year = date.getFullYear();
      if(day <=31){
        this.week.push(`${day}/${Month}/${year}`)
      }else{
        day =1;
        Month +1;
        this.week.push(`${day}/${Month}/${year}`)
      }
;
  }
  }
  validCard(){
    let regex =/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/
    if(!regex.test(this.tempbill.card)){
      this.err= 'invalid card';
      return true;
    }else{
      this.err= null;
      return false;
    }
  }
  validDate(){
    this.api.getShipment(this.tempbill.date).subscribe(
      res=>{
        if(res.data.length >=3){
            this.err = "This day is full try another day";
        }
        
      }
    )
  }
  ValidForm(){

    if(this.tempbill.card && this.tempbill.date && this.tempbill.city && this.tempbill.phone && this.tempbill.street){
      if(!this.err){
      if(this.validCard){
        if(!this.err){
          this.timeToPay()
      }
    }
    }
  }
}
timeToPay(){ 
  this.api.orderPayment(this.tempbill.date).subscribe(
    res=>{
      if(res.success){
        this.api.getNewCart();
        this.PayPOP = true;
      }
    }
  )
}
// DownloadFile(){
//   var textFile = null,
//     makeTextFile = function () {
//       let text = this.api.logged.cart
//       var data = new Blob([text], {type: 'text/plain'});
  
//       if (textFile !== null) {
//         window.URL.revokeObjectURL(textFile);
//       }
  
//       textFile = window.URL.createObjectURL(data);;  
//       return textFile;

//     };
//   }

  goHome(){
    this.router.navigate(['/'])
  }
}

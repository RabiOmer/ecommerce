import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  UserCart:any = null
  TotalPay:number = null


  constructor(private api:ApiService) {
    this.api.updateUserCart();
    this.UserCart = this.api.CartData;
   }

  ngOnInit() {
  }
  deleteFromCart(i){
    if(i >= 0){
      this.UserCart.obj.products.splice(i,1);
      this.api.addPrdouctToCart(this.UserCart.obj).subscribe(
        res=>{
          if(res.success){
            this.api.updateUserCart();
          }
        }
      );
    }
    else if(i == -1){
      this.UserCart.obj.products =[];
      this.api.addPrdouctToCart(this.UserCart.obj).subscribe(
        res=>{
          if(res.success){
            this.api.updateUserCart();
          }
        }
      );
    }

  }
  UpdateAmount(i,n){
    if(this.UserCart.obj.products[i].amount + n >=0){
      this.UserCart.obj.products[i].amount = this.UserCart.obj.products[i].amount + n;
      this.api.addPrdouctToCart(this.UserCart.obj).subscribe(
        res=>{
          if(res.success){
            this.api.updateUserCart();
          }
        }
      );
    }
  }
}

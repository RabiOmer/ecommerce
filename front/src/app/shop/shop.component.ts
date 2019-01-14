import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  cartSize:Boolean = false;
  AddProduct:any = null;
  AddToCart:any = null;
  UserCart: any = null;
  constructor(private api: ApiService) { }

  ngOnInit() {
  }
  selectedProduct(e){
    this.AddProduct = e;
  }
  AddProductToCart(){
    if(this.AddToCart){
      console.log('add',this.AddToCart);
      let num = this.AddToCart*1;
      this.UserCart=this.api.logged.cart;
      let flag = true;
      for(let p of this.UserCart.products){
        if(p.id == this.AddProduct._id){
          p.amount = num; 
          flag = false
        }
      }
      if(flag){
        this.UserCart.products.push({pro_id:this.AddProduct._id,amount:num});
      }
      this.UserCart.id = this.api.logged.user.id;
      this.api.addPrdouctToCart(this.UserCart).subscribe(
        res=>{
          if(res.success){
            this.api.updateUserCart();
            this.AddProduct=null
          }
        }
      )
    }
    this.AddProduct=null
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  allProducts:any={
    obj:null
  }
  CatgoryProduct:any={
    obj:null
  }
  constructor(private router: Router, private api:ApiService) { 

  }

  getallproducts(){
    this.api.allProducts().subscribe(
      res=>{
        if(res.success){
          this.allProducts.obj = res.data;
          console.log(this.allProducts);
        }
      }
    )
  }
  getCatgoryProduct(id){
    this.api.getProductByCatgory(id).subscribe(
      res=>{
        if(res.success){
          this.CatgoryProduct.obj=res.data;
        }
      }
    )
  }

  AddproducttoObj(data){
    console.log('data',data);
    let flag = true;
    for(let p of this.allProducts.obj){
      console.log('-p-',p);
      if(p._id == data._id){
        console.log('p',p);
        p = data;
        flag = false;
      }
    }
    if(flag){
      this.allProducts.obj.push(data);
    }
  }

}

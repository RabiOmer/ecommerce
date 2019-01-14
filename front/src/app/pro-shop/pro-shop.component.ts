import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { ShareDataService } from '../share-data.service';

@Component({
  selector: 'app-pro-shop',
  templateUrl: './pro-shop.component.html',
  styleUrls: ['./pro-shop.component.css']
})
export class ProShopComponent implements OnInit {
  catgoreis:any= null;
  productByCatgory:any={
    obj:null
  }
  allProduct:any ={
    obj: null
  }
  Search:any = null;
  
  @Output() fromProShop:EventEmitter<string> = new EventEmitter<string>();
  constructor(private api:ApiService, private share:ShareDataService) {
    this.api.allProducts().subscribe(
      res=>{
        if(res.success){
          this.allProduct.obj = res.data;
        }
      }
    )
    this.productByCatgory = this.share.CatgoryProduct;
      this.api.getAllGategories().subscribe(
        res=>{
          if(res.success){
            this.catgoreis = res.data;
            this.share.getCatgoryProduct(res.data[0]._id);
          }
        }
      )
   }

  ngOnInit() {
  }

  getProducts(e){
    this.share.getCatgoryProduct(e);
  }

  sendToPopUp(e){
    this.fromProShop.emit(e);
  }

}

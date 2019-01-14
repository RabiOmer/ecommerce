import { Component, OnInit, Output, EventEmitter, Input, PipeTransform } from '@angular/core';
import { ApiService } from '../api.service';
import { ShareDataService } from '../share-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {
  Search:any = null;
  products:any = null;
  productId:any = null;
  @Input() productSon:any;

  @Output() fromProduct:EventEmitter<string> = new EventEmitter<string>();

  constructor(private api:ApiService,private share:ShareDataService) { 
    this.products = this.share.allProducts;
    this.share.getallproducts();
  }

  ngOnInit() {
    
  }


  editProduct(id){
    this.productId = id;
    this.fromProduct.emit(this.productId);
  }

}

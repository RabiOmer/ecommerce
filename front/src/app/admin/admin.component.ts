import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sendproducttoson:any= null;
  productEdit:string=null;

  sideBar:Boolean = true;
  constructor() { }
  ngOnInit() {
  }
  selectedProduct(e:string){
    this.productEdit=e;
    this.sideBar = true;
  }

  gatNewdata(e){
    console.log('dad:',e)
    this.sendproducttoson=e;
    
  }
  showSideBar(b){
    console.log(b);
    if(b){
      this.sideBar = true;
    }
    else{
      this.sideBar = false;
    }
    this.productEdit = null;
  }
}

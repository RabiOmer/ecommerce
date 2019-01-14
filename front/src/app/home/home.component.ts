import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logged:any ={
      user:null
    }
  templogged:any ={
    email: '',
    password: '',
  }
  product:any = {
    name:null
  };
  paidCarts:any = null;
  totalProducts:any = null;
  totalorders:any = null;

  constructor(private api:ApiService) { 
    this.logged.user = this.api.logged;
      this.onload()
  }
  
  ngOnInit() {

  }
  dologin(){
    if(this.templogged.email !='' || this.templogged.password !=''){
      this.api.login(this.templogged.email,this.templogged.password);
    }
  }
  onload(){
    this.api.getNewstProduct().subscribe(
      res => {
        this.product = res.data[0];
      },
      err=> {
      }
    )

    this.api.userPaidCarts().subscribe(
      res=>{
        if(this.logged.user.user.role != 'admin'){
          if(res.data){
            if(res.data.length > 0){
              this.paidCarts = res.data[res.data.length -1];
            }
          }
        this.paidCarts =[]
      }
      },
      err=>{
        
      }
    
    )
    this.api.allProducts().subscribe(
      res =>{
        if(res.success){
          this.totalProducts = res.data.length;
        }
      },
      err =>{

      }
    )
    this.api.allpaidCarts().subscribe(
      res =>{
        if(res.success){
          console.log(res.data.length)
          this.totalorders = res.data.length;
        }
      },
      err =>{

      }
    )
  }

}
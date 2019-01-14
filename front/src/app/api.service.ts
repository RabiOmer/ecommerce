import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  
  logged:any = {
    token: null,
    user: {
      id: null,
      role:null
    },
    cart: null
  }
  flag:boolean= false;
  CartData:any={
    obj:null,
    cost:null
  }

  private usersEndpoint = 'http://localhost:4000/users';
  private productsEndpoint = 'http://localhost:4000/products/';
  private cartsEndpoint = 'http://localhost:4000/cart';
  private categoriesEndpoint = 'http://localhost:4000/categories/';


  constructor(private http: HttpClient, private router: Router) { 
    let _sess = localStorage.getItem('_sess');
    if(_sess) {
      this.setLogged(JSON.parse(_sess));
    }
  }

orderPayment(data){
  return this.http.put< any >(this.cartsEndpoint+`/pay/${this.logged.cart._id}`,{
    date: data
  })
}
getNewCart(){
  return this.http.get < any >(this.cartsEndpoint+'/new/').subscribe(
    res=>{
      if(res.success){
        this.logged.user.cart._id = res.data._id;
      }
    }
  )
}
  getShipment(data){
    return this.http.post< any >(this.cartsEndpoint+`/shipment`,{
      date: data
    })
  }
  getBillingData(){
    return this.http.get < any >(this.usersEndpoint+'/info/'+this.logged.user.id)
  }
  updateUserCart(){
    this.http.get< any >(this.cartsEndpoint+`/${this.logged.cart._id}`).subscribe(
      res=>{
        if(res.success){
          this.CartData.cost = null;
          this.CartData.obj = res.data;
          if(this.CartData.obj.products.length>0){
            for(let u of res.data.products){
              this.CartData.cost += u.pro_id.price * u.amount;
          }
        }
          else{
            this.CartData.cost = 0;
          }
        }
      }
    )
  }

  addPrdouctToCart(data){
    return this.http.put< any >(this.cartsEndpoint+`/${data._id}`,data)
  }
  updateProduct(data){
    return this.http.put< any >(this.productsEndpoint,data)
  }
  addnewProduct(data){
    return this.http.post< any >(this.productsEndpoint,data)
  }
  getAllGategories(){
    return this.http.get< any >(this.categoriesEndpoint)
  }

  userPaidCarts(){
    return this.http.get< any >(this.cartsEndpoint +'/user/'+this.logged.user.id)
  }

  setLogged(obj,notice=null,doStore=false) {
    let newobj ={
      token:obj.token,
      id: obj.id,
      role: obj.role
    }
    this.logged.token = obj.token;
    this.logged.user.id = obj.id;
    this.logged.user.role = obj.role;
    if(this.flag){
      this.dologged();
      this.router.navigate(['/login'])
      this.flag = false;
    }
    if(doStore) {
        localStorage.setItem('_sess',JSON.stringify(newobj));    
    }
  }
  getProductByCatgory(id){
    return this.http.get< any >(this.productsEndpoint+`catgory/${id}`)
  }
  getlogged(){
    return this.logged;
  }
  doLogout() {
    this.setLogged({
      token: null,
      user: {
        id:null
      },
      cart:null
    },null,true);
  }

  dologged(){
    if(this.logged.token || this.logged.user.id){
      return this.http.post< any >(`${this.usersEndpoint}/logged`,{
        id:this.logged.user.id
      }).subscribe(
        result => {
          if(result.success){
            this.logged.user.id = result.data.user.id;
            this.logged.user = result.data.user;
            this.logged.cart = result.data.cart;
          }else{
            this.setLogged({
              token: null,
              user: {
                id:null,
                role:null
              }
            },'Invalid Login',true);
          }
          
        },
        err => {
          this.setLogged({
            token: null,
            user: {
              id:null,
              role:null
            }
          },'Invalid Login',true);  
     }
      )}
  }
  get token() {
    if(this,this.logged.token!=null){
      return this.logged.token;
    }
  }


  login(email,password) {
    this.http.post< any >(`${this.usersEndpoint}/login`,{
      email: email,
      password: password
    }).subscribe(
      result => {
        if(result.success){
          if(result.data.token) {
            this.logged.user.id = result.data.user.id;
            this.logged.user = result.data.user;
            this.logged.cart = result.data.cart;
            if(result.data.user.role !='admin'){
              this.flag = true;
            }
            let obj ={
              token: result.data.token,
              id: result.data.user.id,
              role: result.data.user.role
            };     
            this.setLogged(obj,null,true);
            this.changePage(); 
          }
        }
        else {
          this.setLogged({
            token: null,
            user: {
              id:null,
              role:null
            }
          },'Invalid Login',true);
        }       
      },
      err => {
        this.setLogged({
          token: null,
          user: {
            id:null,
            role:null
          }
        },'Server Error',true);
      }
    );
  }
  changePage() {
    if(this.logged.user.role=='admin'){
      this.router.navigate(["/admin"]);
    }

  }
  getUserByEmail(email:any = null) {
    let call = this.usersEndpoint +'/byemail'; 
    if(email) {
      return this.http.post< any >(call,{
        email:email
      });
    }
  }
  
  createUser(obj){
    let call = this.usersEndpoint;
    if(obj){
      return this.http.post< any >(call,{
        email: obj.email,
        name: obj.name,
        last_name: obj.last_name,
        password: obj.pass,
        phone: obj.phone,
        city: obj.city,
        street: obj.street,
        spam: obj.spam
      })
    }
  }

  getNewstProduct(){
    return this.http.get< any >(this.productsEndpoint+'/new');
  }
  allProducts(){
    return this.http.get< any >(this.productsEndpoint);
  }
  allpaidCarts(){
    return this.http.get< any >(this.productsEndpoint+'paid');
  }


}

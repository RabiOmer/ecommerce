import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  page:Boolean = false;
  tempUser:any ={
    email:null,
    pass:null,
    passtwo:null,
    name:null,
    last_name:null,
    phone:null,
    city:null,
    street:null
  }
  err:any= null;
  constructor(private api: ApiService,private router: Router) { }
  SubmitUSer(){

    if(this.tempUser.name && this.tempUser.last_name && this.tempUser.city && this.tempUser.street){

      if(this.validPhone()){
        this.api.createUser(this.tempUser).subscribe(
          res=>{
            if(res.success){
              this.router.navigate(['/']);
            }else{
              this.err = res.message;
            }
          },
          err=>{

          }
        )
      }
    }
  }
  validPhone(){
  let n =this.tempUser.phone;
  if(n){
    if(!isNaN(n)){
      if(n.length == 10 || n.length == 9){
        this.err = null;
        return true
      }else{
        this.err ="Phone invalid";
      }
    }
    else{
      this.err ="Phone invalid";
    }
  }
    return false
  }
  ngOnInit() {
  }
  nextPage(){
    if(!this.tempUser.email || !this.tempUser.pass || !this.tempUser.passtwo){
      this.err ="Missing Data";
    }
      if(this.tempUser.pass == this.tempUser.passtwo){
        if(this.validEmail){
          if(!this.err){
            this.api.getUserByEmail(this.tempUser.email).subscribe(
              res =>{
                if(res.success){
                  this.err = 'This user Exiest';
                }else{
                  this.page = true;
                }

              },
              err =>{

              })
          }
        }
      }
    
  }
  validPass(){
    if(this.tempUser.pass != this.tempUser.passtwo){
      this.err = 'invalid pass';
    }
    else{
      this.err = null;
    }
  }
  validEmail(){
    let regex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
    if(!regex.test(this.tempUser.email)){
      this.err= 'invalid email';
      return true;
    }else{
      this.err= null;
      return false;
    }
  }

}

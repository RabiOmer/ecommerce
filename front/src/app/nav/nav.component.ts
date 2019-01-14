import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  logged:any ={
    user: null
  }
  constructor(private api:ApiService) { 
    this.logged.user = this.api.logged;
    this.api.dologged();
    console.log(this.api.logged.user);
  }

  ngOnInit() {
  }


  logout(){
    this.api.doLogout();
  }

}

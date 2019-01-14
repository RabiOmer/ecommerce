import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { ApiService } from './api.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router) {
  }


  canActivate(next: ActivatedRouteSnapshot) {
    console.log('auth',this.api.logged.user.role)
    if(next.data) {        
      if(next.data.OnlyAdmin && this.api.logged.user.role != 'admin') { 
        console.log('asdafadsfasd')
          this.router.navigate(['/']);
        
      }
      else if( next.data.onlyNotLogged ) { 
        if( this.api.logged.token != null ) {
          this.router.navigate(['/']);
        }
      } else if(next.data.OnlyLogged && !this.api.logged.token){
        this.router.navigate(['/']);
      }
      else if( next.data.redirectAdmin && this.api.logged.user.role == 'admin' ) {

        this.router.navigate([next.data.redirectAdmin]);
      }
    }
    return true;    
  }
  }

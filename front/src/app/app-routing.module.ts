import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ShopComponent } from './shop/shop.component';
import { LogComponent } from './log/log.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      redirectAdmin: '/admin'
    }
  },
  {
    path: 'login',
    component: LogComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard],
    data: {
      onlyLogged: true
    } 
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      OnlyAdmin: true
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      onlyNotLogged: true
    }   
  },
  {
    path: 'store',
    component: ShopComponent,
    canActivate: [AuthGuard],
    data: {
      onlyLogged: true
    }   
  }
  ,
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

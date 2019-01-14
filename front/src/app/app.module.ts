import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptorService } from './token-interceptor.service';
import { ApiService } from './api.service';
import { ShareDataService } from './share-data.service';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CatgoryComponent } from './catgory/catgory.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductPipe } from './product.pipe';
import { ShopComponent } from './shop/shop.component';
import { ProShopComponent } from './pro-shop/pro-shop.component';
import { LogComponent } from './log/log.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    HomeComponent,
    CatgoryComponent,
    CartComponent,
    RegisterComponent,
    AdminComponent,
    ProductsComponent,
    AddProductComponent,
    ProductPipe,
    ShopComponent,
    ProShopComponent,
    LogComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule
  ],
  providers: [  
    ApiService,
    ShareDataService, 
    AuthGuard,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

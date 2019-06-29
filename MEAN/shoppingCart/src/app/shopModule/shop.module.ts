import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [  
  {
   path: 'addToCart',    
   component: CartComponent,
  }
 ];

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[CartComponent]
})
export class ShopModule { }

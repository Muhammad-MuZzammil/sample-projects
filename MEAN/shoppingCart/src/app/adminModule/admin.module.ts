import {  } from "../shared/general.service";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./products/products.component";

const routes: Routes = [  
  {
   path: 'products',    
   component: ProductsComponent,
  }
 ];

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule, ProductsComponent]
})
export class AdminModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "products", pathMatch: "full" },

  {
    path: "admin",
    loadChildren: "./adminModule/admin.module#AdminModule"
  },
  {
    path: "shop",
    loadChildren: "./shopModule/shop.module#ShopModule"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

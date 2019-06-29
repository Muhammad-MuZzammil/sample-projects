import { GeneralService } from "./shared/general.service";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "../../node_modules/@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "shoppingCart";
  queryParams;
  cartQty: number = 0;
  addItem = 0;
  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.generalService.get("/admin/products").subscribe(res => {
        Array.prototype['sum'] = function (prop) {
          var total = 0
          for ( var i = 0 ; i < res.cart.products.length; i++ ) {
              total += this[i][prop]
          }
          return total
      }
      this.cartQty = res.cart.products.sum("qty")
      });

      this.queryParams = +params.addItem - +params.addItem + 1;
      console.log(+params);

      this.queryParams = this.cartQty + this.queryParams;
      this.cartQty = this.queryParams;
    });
    // this.cartQty = this.queryParams;
  }

  showCart() {
    this.router.navigate(["/addToCart"]);
  }
}

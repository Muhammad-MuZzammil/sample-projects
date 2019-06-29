import { GeneralService } from "./../../shared/general.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "../../../../node_modules/@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  constructor(private generalService: GeneralService, private router: Router) {}
  products = [];
  ngOnInit() {
    this.generalService.get("/cart").subscribe(res => {
      this.products = res.products;
    });
  }
  deleteCart(productId, i) {
    this.generalService
      .delete(`/cart-delete-item/${productId}`)
      .subscribe(res => {
        if (res.status) {
          const deleteItem = this.products.splice(i, 1);
          deleteItem.map(val => {
            console.log(val.qty);

            this.router.navigate(["/addToCart"], {
              queryParams: { addItem: val.qty }
            });
            console.log("saad");

          });
        }
      });
  }
}

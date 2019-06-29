import { GeneralService } from "../../shared/general.service";
import { Component, OnInit } from "@angular/core";
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  constructor(private generalService: GeneralService,private router:Router) {}
products=[]
qtyInc = 0

  ngOnInit() {
    this.generalService.get("/admin/products").subscribe(res => {
      console.log(res);
      this.products = res.prod
    });
  }
  addToCart(productId){
    // console.log(productId)
    let cartId = {
      productId:productId
    }
    this.generalService.post('/cart',cartId).subscribe((res=>{
      // console.log(res)
      if(res.status){
        this.qtyInc++
        this.router.navigate(['/products'], { queryParams: { addItem: this.qtyInc } })
    }
    }))
}
}
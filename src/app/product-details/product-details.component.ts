import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../signUp';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getProduct(productId).subscribe(result => {
        this.productData = result;


        let cartData = localStorage.getItem('localCart')
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((items: product) => productId == items.id.toString())
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;

          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);
          this.productService.cartData.subscribe((result) => {
            let item = result.filter((item: product) => productId?.toString() === item.productId?.toString())
            if (item.length) {
              this.cartData = item[0]
              this.removeCart = true;
            }


          })


        }

      });

    }

  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == "plus") {
      this.productQuantity += 1;

      this.productService.quantity = this.productQuantity
      // this.productQuantity=this.productQuantity+1;
    } else if (this.productQuantity > 1 && val == "min") {
      this.productQuantity = this.productQuantity - 1;
      this.productService.quantity = this.productQuantity
    }
  }
  AddTOCart() {
    
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData)
        this.removeCart = true
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // let cartData={
        //   userId
        // }
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        // delete cartData.id;
        console.log(cartData);
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert("product added in cart")
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        })

      }
    }
  }

  removeToCart(productId: number) {
    
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);

    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.productService.removeToCart(this.cartData?.id).subscribe((result) => {
       // if (result) {
          this.productService.getCartList(userId);
       // }
      })
      this.removeCart = false;
    }
  }
}

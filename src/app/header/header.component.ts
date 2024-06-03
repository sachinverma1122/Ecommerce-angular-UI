import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../signUp';
import { RSA_NO_PADDING } from 'constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  MenuType: String = 'default';
  SellerName = '';
  UserName = '';
  searchResultproduct: undefined | product[];
   cartItems=0;

  constructor(private router: Router, public productService: ProductService) { }

  ngOnInit(): void {
    
    debugger
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn("In seller area")

          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.SellerName = sellerData.name;
            this.MenuType = "seller";
          }
        } else if (localStorage.getItem('user')) {

          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.UserName = userData.name;
          this.MenuType = "user";
          this.productService.getCartList(userData.id)
        } else {
          console.log("outside seller area")
          this.MenuType = 'default';
        }
      }
    });

    let cartData=localStorage.getItem('localCart')
    if(cartData){
       this.cartItems=JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((item)=>{
      this.cartItems = item.length
    })


  }
  logOut() {
    if (localStorage.getItem('seller')) {
      localStorage.removeItem('seller');
      // this.router.navigate(['seller-auth']);
      this.router.navigate(['/']);
    }
  }
  userLogOut(){
    if(localStorage.getItem('user')){
      localStorage.removeItem('user');
      this.router.navigate(['/user-auth'])
      this.productService.cartData.emit([]);
    }
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {

      const htmlElement = (query.target as HTMLInputElement);
      this.productService.searchProduct(htmlElement.value).subscribe(result => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResultproduct = result;
      })
    }

  }
  hideSearch() {
    this.searchResultproduct = undefined;
  }
  submitSearch(value: string) {
    console.log(value)
    this.router.navigate([`/search/${value}`])

  }

  redirectToDetails(id: number) {
    this.router.navigate(['/product-details/' + id]);

  }
}

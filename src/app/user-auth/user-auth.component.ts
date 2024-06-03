import { Component, OnInit } from '@angular/core';
import { cart, login, product, signUp } from '../signUp';
import { UserService } from '../services/user.service';
import { JsonPipe } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showlogin: boolean = true;
  authError:string="";

  constructor(private userService: UserService,private productServic:ProductService) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }
  signUp(data: signUp) {
    this.userService.userSignUp(data);

  }
  login(data: login) {
    this.userService.userLogin(data);
    this.userService.invaliduserAuth.subscribe((result) =>{
      if(result){
        this.authError="Please Enter Valid user details"
      }else{
        this.localCartToRemoteCart();
      }
    })
  }
  openSignUp() {
    this.showlogin = false;
  }
  openLogin() {
    this.showlogin = true;
  }

  localCartToRemoteCart(){
let data = localStorage.getItem('localCart');
let user= localStorage.getItem('user')
let userId = user && JSON.parse('user').id;
if(data){
  let cartDataList:product[]= JSON.parse('data');

  cartDataList.forEach((product:product,index) => {
    let cartData:cart={
      ...product,
      productId:product.id,
      userId
    };
    //delete cartData.id
setTimeout(() => {
  this.productServic.addToCart(cartData).subscribe((result)=>{
    if(result){
      console.log("item stored in db")
    }
        })
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
}, 500);
  });

}
setTimeout(() => {
  
this.productServic.getCartList(userId);
}, 2000);
  }
}

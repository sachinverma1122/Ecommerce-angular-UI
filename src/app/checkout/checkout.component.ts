import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../signUp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
totalPrice:number|undefined;
cartdata:cart[]|undefined;
orderMessage:string|undefined;
quantity:number | undefined;

  constructor( private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe(result => {
      this.cartdata=result;
      let price = 0;
      result.forEach((item) =>{
        this.quantity=item.quantity;
        if(item.quantity)
        price = price + (+item.price*+ item.quantity);
    })
    this.totalPrice=price+(price/10)+100-(price/10);
 
    });
  }
  orderNow(data:{email:string,address:string,contact:string}){

    let user= localStorage.getItem('user')
    let userId= user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderData:order ={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        quantity:this.quantity,
        id:undefined,
      }

      this.cartdata?.forEach((item)=>{
      setTimeout(() => {
       item.id && this.productService.deleteCartItem(item.id)
      }, 2000);
      })
      this.productService.orderNow(orderData).subscribe(result =>{
        if(result){
          alert("order placed");
this.orderMessage="Your orde has been placed"
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMessage=undefined
          }, 4000);
        }
        
      })
    }
  }
}

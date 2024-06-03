import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../signUp';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
productData : undefined | product;
productMessage:undefined|string;
productList: undefined | product[];

  constructor(private router :ActivatedRoute,private productService:ProductService) { }

  ngOnInit(): void {
    // this will used to get productId when i click to edit icon
      let productId = this.router.snapshot.paramMap.get('id');
    productId&& this.productService.getProduct(productId).subscribe((data)=>{
      this.productData=data;
    });
  }
  
  submit(data:product){
    if(this.productData){
      data.id=this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((data)=>{
       this.productMessage="product update successfully";
    })
    setTimeout(()=>{
      this.productMessage=undefined
    },3000);
  }

  lists(){
    this.productService.productList().subscribe(result => {
      if(result){
      this.productList = result;
    }});
  
  }
}

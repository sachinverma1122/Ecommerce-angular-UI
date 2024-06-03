import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../signUp';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;
  faCoffee = faTrash;
  editIcon=faEdit;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.list();
  }
  deleteProductById(id: number) {
    console.log("delete Id ", id);
    this.productService.deleteProduct(id).subscribe((result) => {
        this.productMessage = "Product Deleted Successfully"
        this.list();
    })
    setTimeout(()=>{
      this.productMessage=undefined}
      ,3000);
  }

  list(){
    this.productService.productList().subscribe(result => {
      if(result){
      this.productList = result;
    }})
  
  }
}
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../signUp';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProduct: undefined | product[];
  trendyProduct :undefined| product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.popularProduct().subscribe(data => {
      this.popularProduct = data;
    })

    this.productService.trendyProduct().subscribe(data =>{
      this.trendyProduct = data;
    });
  }

}

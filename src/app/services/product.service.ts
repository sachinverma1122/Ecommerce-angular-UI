import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../signUp';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  quantity: undefined | number;
  cartData = new EventEmitter<product[] | []>()

  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    return this.http.post("http://localhost:8080/api/products", data);

  }
  productList() {
    return this.http.get<product[]>("http://localhost:8080/api/products/getAll");
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:8080/api/products/${id}`)
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:8080/api/products/${id}`)

  }
  updateProduct(data: product) {
    return this.http.put<product>(`http://localhost:8080/api/products/${data.id}`, data)
  }
  popularProduct() {
    return this.http.get<product[]>("http://localhost:8080/api/products/getAll?_limit=4");
  }
  trendyProduct() {
    return this.http.get<product[]>("http://localhost:8080/api/products/getAll?_limit=8");

  }
  searchProduct(query: string) {
    return this.http.get<product[]>(`http://localhost:8080/api/products/search?keyword=${query}`);

  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);

    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      //  cartData.push(JSON.parse(localCart))
      //   cartData.push(data);

      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)

  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post("http://localhost:8080/api/cart", cartData,)
  }

  getCartList(userId: number) {
    this.http.get<product[]>("http://localhost:8080/api/cart/?userId=" + userId, { observe: 'response' }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });

  }

  removeToCart(cartId: number) {
    return this.http.delete("http://localhost:8080/api/cart/" + cartId);
  }

  currentCart() {
    // not create api from backend
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>("http://localhost:8080/api/cart/?userId=" + userData.id)
  }

  orderNow(data: order) {
    return this.http.post("http://localhost:8080/api/order", data);
  }

  orderList() {

    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>("http://localhost:8080/api/order?userId=" + userData.id);
  }

  deleteCartItem(cartId: number) {
    return this.http.delete("http://localhost:8080/api/cart/" + cartId).subscribe(result => {
      if (result) {
        this.cartData.emit([]);
      }
    });
  }

  cancelOrder(orderId: number) {
    return this.http.delete("http://localhost:8080/api/order/" + orderId)
  }
}


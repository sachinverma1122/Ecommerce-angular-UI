import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signUp } from '../signUp';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
   isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    console.warn("seller-service call")
    this.http.post('http://localhost:8080/signUp', data, { observe: 'response' }).subscribe(result => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
    });
  }

  userLogin(data:login){
    console.warn(data)
      this.http.get(`http://localhost:8080/signUp/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any) =>{
        if(result && result.body){
          console.log("user loginIn");
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']); 
        }else{
          console.log("user failed");
          this.isLoginError.emit(true);
        }
      })

  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}

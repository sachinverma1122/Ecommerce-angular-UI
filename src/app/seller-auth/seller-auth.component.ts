import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../signUp';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError: string = '';

  constructor(private seller: SellerService, public router: Router) { }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data: signUp): void {
    console.warn(data)
    this.seller.userSignUp(data)
  }

  login(data: signUp): void {
    this.authError = "";
    console.warn(data)
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "email or password is not correct";
      }
    })
  }

  openLogin() {
    this.showLogin = true
  }

  onSignUp() {
    this.showLogin = false;
  }

}

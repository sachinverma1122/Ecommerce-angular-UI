import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../signUp';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  invaliduserAuth= new EventEmitter<boolean>(false);
  // isUserLoginerror= new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(user:signUp){
    return this.http.post("http://localhost:8080/user",user,{observe:'response'})
    .subscribe(result =>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/']);
      }
    });

  }
  userLogin(user:login){
    return this.http.get<login>(`http://localhost:8080/user/seller?email=${user.email}&password=${user.password}`,{observe:'response'}).subscribe((result:any) =>{
      if(result && result.body && result.body.email!=null){
        this.invaliduserAuth.emit(false);
localStorage.setItem('user',JSON.stringify(result.body))
this.router.navigate(['/']);
    }else{
      this.invaliduserAuth.emit(true);
    }
      // else{
      //   console.log("user failed");
      //   this.isUserLoginerror.emit(true);
      // }
    })

  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}

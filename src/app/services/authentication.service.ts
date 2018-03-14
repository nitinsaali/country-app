import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs/Rx";
import { UserResponse } from '../interfaces/user-response';

@Injectable()
export class AuthenticationService {
  private userResponse: UserResponse;
  favoritesCount: number;
  public users = [];
  /* this is to update favorite badge count 
     this is not working..needs to think on it 
  */
  //favoritesCountChange: Subject<number> = new Subject<number>();
  constructor() { 
    this.users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    //this.favoritesCount = 0;
    // this.favoritesCountChange.subscribe((value) => {
    //   this.favoritesCount = value
    // });
  }
  

  login(email: string, password: string) {
    let data = {
      email,
      password
    };
   
    let userFound = this.users.filter(item => item.email == email && item.password == password);
    
    if(userFound.length > 0) {
      let returnResponse = {
        success: true,
        message: 'Login Success',
        username: email,
        favorites: userFound[0]['favorites']
      };
      sessionStorage.setItem("currentUser", JSON.stringify(returnResponse));
      return Observable.of(returnResponse);
    } else {
      let returnResponse = {
        success: false,
        message: 'Email or Password is incorrect',
        username: email,
        favorites: []
      };
      return Observable.of(returnResponse);
    }    
  }
  
  
  register(email: string, password: string) {  
    let data = {
      email,
      password,
      favorites: []
    };
    
    let userFound = this.users.filter(item => item.email == email);
    
    if(userFound.length > 0) {
      let returnResponse = {
        success: false,
        message: 'Email ID already Exists',
        username: email,
        favorites: []
      };
      return Observable.of(returnResponse);
    }
    
    this.users.push(data);
    localStorage.setItem("users", JSON.stringify(this.users));

    let returnResponse = {
      success: true,
      message: 'Registration successful',
      username: email,
      favorites: []
    };
    return Observable.of(returnResponse);
  }
  
  getLoggedInUser() {
    return sessionStorage.getItem("currentUser");
  }

  setFavorites(code: string, value: boolean){

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    
    let allUsers = JSON.parse(localStorage.getItem("users"));

    let localStorageUser = allUsers.find(item => item.email == currentUser.username);

     if(value) {
        currentUser.favorites.push(code); 
        localStorageUser.favorites.push(code);    
     } else {
       currentUser.favorites = currentUser.favorites.filter(item => item !== code);
       localStorageUser.favorites = localStorageUser.favorites.filter(item => item !== code);
     }
     sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
     
     var index = allUsers.indexOf(localStorageUser);

     allUsers[index] = localStorageUser;
     localStorage.setItem("users", JSON.stringify(allUsers));
     //this.favoritesCount = currentUser.favorites.length;
     //this.countChange.next(this.favoritesCount);
     //console.log(JSON.parse(sessionStorage.getItem("currentUser")));
     //console.log(JSON.parse(localStorage.getItem("users")));
  }

  getFavoritesCount() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    //this.favoritesCountChange.next(currentUser.favorites.length);
    //this.favoritesCount = currentUser.favorites.length;
    return currentUser.favorites.length;
  }
}

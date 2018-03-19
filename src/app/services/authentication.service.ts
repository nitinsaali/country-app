import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs/Rx";
import { UserResponse } from '../interfaces/user-response';

@Injectable()
export class AuthenticationService {
  private userResponse: UserResponse;
  public users = [];
  @Output() favoritesCountChange: EventEmitter<any> = new EventEmitter();
 
  constructor() { 
    this.users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
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
      this.favoritesCountChange.emit(userFound[0]['favorites'].length);
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
    
     this.favoritesCountChange.emit(currentUser.favorites.length);
     
     allUsers[index] = localStorageUser;
     localStorage.setItem("users", JSON.stringify(allUsers));
  }

  getFavoritesCount() {
    return this.favoritesCountChange;
  }
}

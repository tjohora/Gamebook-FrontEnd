import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { user } from '../models/user';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<user>;
  public currentUser: Observable<user>;
  postImage: File = null;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public get currentUserValue(): user {
    return this.currentUserSubject.value;
  }

  url: string = "http://localhost:8080/Year3Project/webresources/user";
  // url: string = "http://localhost:25876/Year3Project/webresources/user";

  register(details) {
    let reg = this.url + "/register"
    let jsonStr = JSON.stringify(details);
    console.log(jsonStr);
    return this.http.post<any>(reg, jsonStr).pipe(map(user => {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  login(details) {
    let reg = this.url + "/login"
    let jsonStr = JSON.stringify(details);
    console.log(jsonStr);
    return this.http.post<any>(reg, jsonStr).pipe(map(user => {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);

      return user;


    }));
  }
  editUserDetails(details) {
    let reg = this.url + "/editUser"
    let jsonStr = JSON.stringify(details);
    console.log(jsonStr);
    return this.http.post<any>(reg, jsonStr);
  }

  logout() {
    // remove user from session storage and set current user to null
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUsers(): Observable<user[]> {
    console.log("URL: " + this.url);
    return this.http.get<user[]>(this.url + "/getAllUsers");
  }

  removeUser(userId) {
    let url = this.url + "/deleteUser/" + userId;
    this.http.put(url, "", httpOptions).subscribe();
    window.location.reload();
  }

  uploadImage(image) {
    this.postImage = image;
    let url = this.url + "/upload";
    const file = new FormData();


    file.append('image', this.postImage, this.postImage.name);
    file.append('userId', this.currentUserValue.userId + "");
    console.log(file.get('userId'));

    this.http.post<any>(url, file).subscribe(res => {
      console.log(res);
    })
  }


  getFriendsList(userId) {
    let url = this.url + '/friend/' + userId;
    return this.http.get<any>(url);

  }

  addFriend(userId, friendId) {
    let reg = this.url + "/friend"
    const file = new FormData();
    file.append('userId', userId);
    file.append('friendId', friendId);
    
    return this.http.post<any>(reg, file).subscribe(res => {
      console.log(res);
    })
  }

  getUserDetails(userId) {
    let url = this.url + '/getUserDetails/' + userId;

    return this.http.get<user>(url);
  }

}

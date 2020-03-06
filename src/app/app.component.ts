import { Component, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gamebook-project';

  public data:any=[];

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService){
    
  }

  saveInSession(key, val): void {
    this.storage.set(key , val);
    this.data[key]= this.storage.get(key);
   }

  getFromSession(key): void {
    this.data[key]= this.storage.get(key);
   }
}

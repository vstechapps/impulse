import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var app:AppService;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public $header:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
    app = this;
  }

  public header(k:boolean){
    this.$header.next(k);
  }

}

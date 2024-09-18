import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { logger } from './logger.service';

declare var app:AppService;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public $header:Subject<boolean> = new Subject<boolean>();

  constructor() {
    logger.log("AppService: Init",this);
    app = this;
    logger.log("AppService: Init Complete",this);
  }

  public header(k:boolean){
    logger.log("AppService: header::",k);
    if(k!=undefined){
      this.$header.next(k);
    }
  }

}

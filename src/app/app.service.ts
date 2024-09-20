import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { logger } from './logger.service';
import { Router } from '@angular/router';
import { Dialog } from './app.models';

declare var app:AppService;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public $header:Subject<boolean> = new Subject<boolean>();
  public $dialog:Subject<Dialog> = new Subject<Dialog>();

  constructor(private router:Router) {
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

  public navigate(path:string){
    logger.log("AppService: navigate:: "+path);
    this.router.navigateByUrl(path);
  }

  public dialog(d:Dialog){
    logger.log("AppService: dialog:: ",d);
    this.$dialog.next(d);
  }

}

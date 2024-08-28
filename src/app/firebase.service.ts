import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { FirebaseApp, initializeApp } from "firebase/app";
import { logger } from './logger.service';
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  app: FirebaseApp;

  analytics: Analytics;

  constructor() {
    logger.log("FirebaseService: Init",this);
    this.app = initializeApp(environment.firebaseConfig);
    this.analytics = getAnalytics(this.app);
    logger.log("FirebaseService: Init Complete",this);
  }


  log(event:string,data:any=null){
    let message:any={
      url:window.location.href,
      device:window.navigator.userAgent,
      timestamp:new Date().toISOString(),
      event:event
    }
    if(data){
      message.data=data;
    }
    logger.log("FirebaseService: Sending Event to Analytics: ",event, message);
    logEvent(this.analytics, event, message);
  }
}

export enum Events{
  PAGE_VIEW="PAGE_VIEW",
  LOGIN="login",
  SIGN_UP="sign_up",
  LOGOUT="logout"
}

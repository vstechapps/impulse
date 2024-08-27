import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { FirebaseApp, initializeApp } from "firebase/app";
import { logger } from './logger.service';
import { Analytics, getAnalytics } from 'firebase/analytics';

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
}

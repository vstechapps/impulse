import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { logger } from './logger.service';
import { Auth, getAuth } from 'firebase/auth';
import { User } from './app.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth: Auth;
  user?:User;
  isAdmin:boolean=false;

  constructor(private firebase: FirebaseService) {
    logger.log("AuthenticationService: Init",this);
    this.auth = getAuth(this.firebase.app);
    logger.log("AuthenticationService: Init Complete",this);
  }
}

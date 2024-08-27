import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { Firestore, getFirestore } from 'firebase/firestore';
import { logger } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore;

  constructor(private firebase: FirebaseService) {
    logger.log("FirestoreService: Init",this);
    this.firestore = getFirestore(this.firebase.app);
    logger.log("FirestoreService: Init Complete",this);
  }
}

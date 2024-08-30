import { Injectable } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import { logger } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) {
    logger.log("DataService: Init",this);

    logger.log("DataService: Init Complete",this);
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { collection, Firestore, getDocs, getFirestore, limit, query } from 'firebase/firestore';
import { logger } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore;

  data:any = {};
  cursors:any = {};

  refresh:EventEmitter<string> = new EventEmitter<string>();

  constructor(private firebase: FirebaseService) {
    logger.log("FirestoreService: Init",this);
    this.firestore = getFirestore(this.firebase.app);
    logger.log("FirestoreService: Init Complete",this);
  }

  public load(key:string,cursor:{order:number,limit:number}={order:0,limit:100}){
    logger.log("FirestoreService: Refreshing "+key)
    let collect =  collection(this.firestore, key);
    const q = query(collect, limit(cursor.limit));
    getDocs(q).then(res=>{
    this.data[key] =[];
    res.forEach(doc=>
      {
        let d:any = doc.data();
        d.id=doc.id;
        this.data[key].push(d);
      });
      this.data[key].sort((a:any,b:any)=>{return a.order-b.order});
      this.refresh.emit(key);
    });
  }


}

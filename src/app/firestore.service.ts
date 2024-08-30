import { EventEmitter, Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { collection, endAt, Firestore, getDocs, getFirestore, limit, orderBy, query, startAt } from 'firebase/firestore';
import { logger } from './logger.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore;

  data:any = {};

  constructor(private firebase: FirebaseService) {
    logger.log("FirestoreService: Init",this);
    this.firestore = getFirestore(this.firebase.app);
    logger.log("FirestoreService: Init Complete",this);
  }

  public async read(key:string,cursor:Cursor={order:"order",start:0,end:100,limit:100}):Promise<any[]>{
    logger.log("FirestoreService: read:: "+key);
    let collect =  collection(this.firestore, key);
    let q = query(collect, startAt(cursor.start), endAt(cursor.end), limit(cursor.limit), orderBy(cursor.order));
    let data:any[] = [];
    let res = await getDocs(q);
    res.forEach(doc=>{
      let d:any = doc.data();
      d.id=doc.id;
      data.push(d);
    });
    return Promise.resolve(data);
  }


}

type Cursor = {
  order:string;
  start:number;
  end:number;
  limit:number;
}
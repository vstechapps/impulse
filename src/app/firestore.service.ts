import { EventEmitter, Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { collection, endAt, Firestore, getDocs, getFirestore, limit, orderBy, query, startAt } from 'firebase/firestore';
import { logger } from './logger.service';
import { Observable, of } from 'rxjs';
import { orderByKey } from 'firebase/database';

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

  public async read(key:string,cursor:Cursor={order:"order",start:1,end:100,limit:100}):Promise<any[]>{
    logger.log("FirestoreService: read:: ",key,cursor);
    let collect =  collection(this.firestore, key);
    let q = query(collect, limit(cursor.limit));
    let data:any[] = [];
    let res = await getDocs(q);
    res.forEach(doc=>{
      let d:any = doc.data();
      d.id=doc.id;
      data.push(d);
    });
    data.sort((a:any,b:any)=>{return a.order-b.order});
    return Promise.resolve(data);
  }


}

type Cursor = {
  order:string;
  start:number;
  end:number;
  limit:number;
}
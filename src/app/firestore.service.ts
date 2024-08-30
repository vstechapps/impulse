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

  refresh:EventEmitter<string> = new EventEmitter<string>();

  constructor(private firebase: FirebaseService) {
    logger.log("FirestoreService: Init",this);
    this.firestore = getFirestore(this.firebase.app);
    logger.log("FirestoreService: Init Complete",this);
  }

  public read(key:string,cursor:Cursor={order:"order",start:0,end:100,limit:100}):Observable<any[]>{
    logger.log("FirestoreService: read:: "+key);
    let collect =  collection(this.firestore, key);
    let q = query(collect, startAt(cursor.start), endAt(cursor.end), limit(cursor.limit), orderBy(cursor.order));
    let data:any[] = [];
    getDocs(q).then(res=>{
      res.forEach(doc=>
        {
          let d:any = doc.data();
          d.id=doc.id;
          data.push(d);
    });
  });
   return of(data);
  }


  public load(key:string,cursor:{order:number,limit:number}={order:0,limit:100}){
    logger.log("FirestoreService: Refreshing "+key);
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

type Cursor = {
  order:string;
  start:number;
  end:number;
  limit:number;
}
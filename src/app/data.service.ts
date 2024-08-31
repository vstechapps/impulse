import { Injectable } from '@angular/core';
import { logger } from './logger.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private data:any;

  constructor(private firestore: FirestoreService) {
    logger.log("DataService: Init",this);
    this.load();
    logger.log("DataService: Init Complete",this);
  }
  
  private load(){
    let defaults = ["pages","models","rules"];
    defaults.forEach((key)=>{
      let j = window.localStorage.getItem(key);
      let k = this.get("config",key);
      let l = window.localStorage.getItem(key+"_refresh_dtm");
      let r = true;
      if(l!=null && k!=null && k["refresh"]!=null && (new Date(l)).getTime()>(new Date(k["refresh"]).getTime())){
        r = false;
      }
      if(j==null || r){
        this.data[key] = this.firestore.read(key);
        try{
          window.localStorage.setItem(key,JSON.parse(this.data[key]));
          window.localStorage.setItem(key+"_refresh_dtm",(new Date()).toISOString());
        }catch(err){
          console.error(err);
        }
      }else{
        this.data[key] = JSON.parse(j);
      }
    });
  }

  private get(col:string,key:string){
    let d = null;
    if(this.data[col]==null){
      this.data[col] = this.firestore.read(col);
    }
    if(this.data[col]!=null){
      d=this.data[col].filter((c:any)=>c.id==key)[0];
    }
    return d;
  }
}


export enum APP {
  CONFIG="config",
  PAGES="pages",
  MODELS="models",
  RULES="rules"
}

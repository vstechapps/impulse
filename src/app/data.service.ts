import { Injectable } from '@angular/core';
import { logger } from './logger.service';
import { FirestoreService } from './firestore.service';
import { LoaderService } from './loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private data:any={};

  constructor(private firestore: FirestoreService,private loader:LoaderService) {
    logger.log("DataService: Init",this);
    logger.log("DataService: Init Complete",this);
  }
  
  public async load(){
    let defaults = ["pages","models","rules","menu"];
    for(var key of defaults){
      this.loader.show();
      let j = window.localStorage.getItem(key);
      let k = await this.get("config", key);
      let l = window.localStorage.getItem(key + "_refresh_dtm");
      let r = true;
      if (l != null && k != null && k["refresh"] != null && (new Date(l)).getTime() > (new Date(k["refresh"]).getTime())) {
        r = false;
      }
      if (j == null || r) {
        this.data[key] = await this.firestore.read(key);
        this.loader.hide();
        try {
          window.localStorage.setItem(key, JSON.stringify(this.data[key]));
          window.localStorage.setItem(key + "_refresh_dtm", (new Date()).toISOString());
        } catch (err) {
          console.error(err);
        }
      } else {
        this.data[key] = JSON.parse(j);
        this.loader.hide();
      }
    }
  }

  public async get(col:string,key:string){
    let d = null;
    if(this.data[col]==null){
      this.data[col] = await this.firestore.read(col);
    }
    if(this.data[col]!=null && Array.isArray(this.data[col])){
      d=this.data[col].filter((c:any)=>c.id==key)[0];
    }
    return d;
  }


  public read(col:string, key?:string){
    let d = null;
    if(key==null || key ==""){
      d = this.data[col];
    }else if(this.data[col]!=null && Array.isArray(this.data[col])){
      d=this.data[col].filter((c:any)=>c.id==key)[0];
    }else{
      d = null;
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

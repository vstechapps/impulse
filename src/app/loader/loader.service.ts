import { Injectable } from '@angular/core';
import { logger } from '../logger.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading = new BehaviorSubject<boolean>(false);

  private count = 0;

  constructor() {
    logger.log("LoaderService: Init",this);
    logger.log("LoaderService: Init Complete",this);
   }

  show(){
    this.count++;
    if(this.count>0)this.loading.next(true);
  }

  hide(){
    this.count--;
    if(this.count==0) this.loading.next(false);
  }
}

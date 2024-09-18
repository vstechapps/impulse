import { Injectable } from '@angular/core';
import { APP, DataService } from './data.service';
import { logger } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private data: DataService) {
    logger.log("ConfigService: Init",this);
    logger.log("ConfigService: Init Complete",this);
  }

  get(key:string){
    return this.data.get(APP.CONFIG,key);
  }

}

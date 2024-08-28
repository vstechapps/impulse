import { environment } from '../environments/environment';


export class logger {

  static log(...args:any[]): void {
    if(environment!=null && environment.logging==true) {
      console.log(...args);
    }
  }
  
}

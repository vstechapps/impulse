import { environment } from '../environments/environment';


export class logger {

  static log(...args:any[]): void {
    if (environment.logging) {
      console.log(...args);
    }
  }
}

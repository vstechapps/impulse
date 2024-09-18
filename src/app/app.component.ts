import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { logger } from './logger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,LoaderComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {

  constructor(public router: Router){
    logger.log("AppComponent: Init",this);
    let redirect = sessionStorage.getItem("redirect");
    logger.log("AppComponent: redirect:: "+redirect);
    if(redirect){
      sessionStorage.removeItem("redirect");
      this.router.navigateByUrl(redirect);
    }
    logger.log("AppComponent: Init Complete",this);
  }
}

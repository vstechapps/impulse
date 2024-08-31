import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { LogoComponent } from '../logo/logo.component';
import { MenuComponent } from '../menu/menu.component';
import { AuthenticationService } from '../authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent,MenuComponent,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  enabled:boolean = true;
  menu:boolean=false;

  constructor(private app:AppService, public auth:AuthenticationService){
    this.app.$header.subscribe(k=>this.enabled=k);
  }

  home(){
    window.location.href=window.location.origin;
  }

}

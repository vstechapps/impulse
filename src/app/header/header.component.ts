import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { LogoComponent } from '../logo/logo.component';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../user.service';
import { NgIf } from '@angular/common';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent,MenuComponent,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  enabled:boolean = false;
  menu:boolean=false;
  header?:any;
  logo?:string;

  constructor(private app:AppService, public auth:UserService, private config:ConfigService){
    this.header = this.config.get("header");
    if(this.header){
      this.enabled = this.header.show?this.header.show:false;
      this.menu = this.header.menu?this.header.menu:false;
      this.logo = this.header.logo?this.header.logo:undefined;
    }
    this.app.$header.subscribe(k=>this.enabled=k);
    
  }

  home(){
    window.location.href=window.location.origin;
  }

}

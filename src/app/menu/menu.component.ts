import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../app.models';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor,NgClass,NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less'
})
export class MenuComponent {
  @Output()
  close = new EventEmitter();

  active:string="";

  user?:User;

  menus:Menu[]=[];

  smenus:Menu[] = [];

  constructor(public router:Router, public route:ActivatedRoute, public auth: AuthenticationService, public data:DataService){
    this.active = this.router.url;
    this.user = this.auth.user;
    this.load();
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.active = this.router.url;
      }
    });
    this.smenus = data.read("menu");
    this.auth.refresh.subscribe(user=>{this.user=user;this.load();});
    
  }

  load(){
    this.menus=[];
    this.menus.push({"name":"Home",icon:"home",route:"home"});
    for(var i in this.smenus){
      var m:Menu = this.smenus[i];
      if((this.user== null && m.role==null) ||(this.user!=null && m.role!= null && m.role.indexOf(this.user.role)>-1)){
        this.menus.push({name:this.smenus[i].name,icon:this.smenus[i].icon,route:this.smenus[i].route});
      }
    }
    if(!this.user){
      this.menus.push({name:"Login",icon:"login",route:"login"});
    }else{
      this.menus.push({name:"Logout",icon:"logout",route:"logout"});
    }
  }


  focus(view:string){
    console.log(view);
    this.router.navigate([view]);
    setTimeout(()=>this.close.emit(),100);
  }

}

type Menu = {
  name:string,
  icon:string,
  route:string
  role?:string
}
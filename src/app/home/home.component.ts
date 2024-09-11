import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  page:string="home";

  constructor(private router:Router){
    var redirect = sessionStorage.getItem("redirect");
    if(redirect){
      sessionStorage.removeItem("redirect");
      this.router.navigateByUrl(redirect);
    }else{
      this.router.navigateByUrl("");
    }
    
  }


}

import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.less'
})
export class LogoutComponent {

  constructor(private router:Router, private auth: UserService){
    this.auth.refresh.subscribe(user=>{
      if(user==undefined)this.router.navigate([""]);
    });
  }

  logout(){
    signOut(this.auth.auth).then(()=>this.auth.logout());
    
  }

}

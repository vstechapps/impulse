import { Component } from '@angular/core';
import { LoaderService } from '../loader.service';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  private provider = new GoogleAuthProvider();

  constructor(private loader:LoaderService){

  }

  login(){
    this.loader.show();
  }

}

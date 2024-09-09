import { Component } from '@angular/core';
import { LoaderService } from '../loader/loader.service';
import { GoogleAuthProvider } from 'firebase/auth';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { signInWithPopup } from 'firebase/auth';
import { logger } from '../logger.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  private provider = new GoogleAuthProvider();

  constructor(private router:Router, private auth: UserService, private loader:LoaderService){
    logger.log("LoginComponent: Init",this);
    this.init();
    logger.log("LoginComponent: Init Complete",this);
  }

  init(){
    var redirect:any = sessionStorage.getItem("redirect");
    sessionStorage.removeItem("redirect");
    this.auth.refresh.subscribe(user=>{
      if(user!=null){
        if(redirect){
          logger.log('LoginComponent: Login Success, Redirecting to ', redirect);
          this.router.navigateByUrl(redirect);
        }else{
          logger.log('LoginComponent: Login Success, Redirecting to home');
          this.router.navigate(["home"]);
        }
      }else{
        logger.log('LoginComponent: Login Failed, Redirecting to home');
        this.router.navigate(["home"]);
      }
    });
  }

  login(){
    // Show Loader
    this.loader.show();
    signInWithPopup(this.auth.auth, this.provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      let user:any = result.user;
      logger.log("LoginComponent: SignedIn User:",user);
      this.loader.hide();
  
    }).catch((error) => {
      // Hide Loader
      this.loader.hide();
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
  });
    
 }

}

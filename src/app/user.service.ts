import { EventEmitter, Injectable } from '@angular/core';
import { Events, FirebaseService } from './firebase.service';
import { logger } from './logger.service';
import { Auth, getAuth } from 'firebase/auth';
import { Role, User } from './app.models';
import { LoaderService } from './loader/loader.service';
import { collection, doc, getDoc, setDoc} from "firebase/firestore";
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth: Auth;

  public user?:User;

  refresh:EventEmitter<User> = new EventEmitter<User>();

  constructor(private firebase: FirebaseService,private loader:LoaderService, private firestore:FirestoreService) {
    logger.log("AuthenticationService: Init",this);
    this.auth = getAuth(this.firebase.app);
    this.intialize();
    logger.log("AuthenticationService: Init Complete",this);
  }

  intialize(){
    this.auth.onAuthStateChanged((authState:any)=>{
      if(authState==null){
        this.user=undefined;
        this.refresh.emit(undefined);
      }else{
        console.log("AuthenticationService:initialize:: Auth State Changed ",authState);
        // Show Loader
        this.loader.show();
        let user:any= authState;
        // User has properties uid, email, displayName, phoneNumber, photoURL
        let u: User = {id:user.uid,email:user.email,name:user.displayName,contact:user.phoneNumber,image:user.photoURL,role:Role.USER}
        this.login(u);
      }
      
    })
  }

  async login(user:User){
    const docRef = doc(this.firestore.firestore, "users", user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Existing User - User already present in firestore
      let d:any = docSnap.data();
      console.log("AuthenticationService:login:: Existing User :", d);
      this.user = {id:d.id,name:d.name,email:d.email,contact:d.contact,role:d.role,image:d.image};
      this.refresh.emit(this.user);
      sessionStorage.setItem("user", JSON.stringify(this.user));
      this.firebase.log(Events.LOGIN,this.user);
      // Hide Loader
      this.loader.hide();
    } else {
      // New User  - Register user details into firestore
      logger.log("AuthenticationService:login:: Registering new user: "+user.email);
      this.user = user;
      await setDoc(doc(collection(this.firestore.firestore,"users"), user.id),this.user);
      logger.log("AuthenticationService:login:: Registered new user: "+user.email);
      this.refresh.emit(this.user);
      sessionStorage.setItem("user", JSON.stringify(this.user));
      this.firebase.log(Events.SIGN_UP,this.user);
      // Hide Loader
      this.loader.hide();
    }

  }

  async logout(){
    logger.log("AuthenticationService:logout:: Logging out user: "+this.user?.email);
    this.user=undefined;
    sessionStorage.clear();
    this.firebase.log(Events.LOGOUT,this.user);
    this.refresh.emit(this.user);
  }
}

import { Input, Component, ViewEncapsulation } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { collection, doc, setDoc } from 'firebase/firestore';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { LoaderService } from '../loader/loader.service';
import { Page } from '../app.models';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { logger } from '../logger.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [NgIf,NgClass,FormsModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.less',
  encapsulation: ViewEncapsulation.Emulated
})
export class PageComponent {
  @Input()
  id?:string;

  page?:Page;

  editPageModal:boolean = false;

  editPageView:string = "html";

  constructor(private router:Router,private route:ActivatedRoute, 
    private data:DataService, public user:UserService, private loader:LoaderService,
    private firestore:FirestoreService,
    private app:AppService){
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          this.init();
      }
    });

  }

  ngOnInit(): void {
    this.init();
  }

  init(): void{
    let id = this.id? this.id: this.route.snapshot.paramMap.get('id');
    logger.log("PageComponent: init:: "+id);
    if(id){
      this.refresh(id);
    }
  }


  async refresh(id:string){
    var page:Page = await this.data.get("pages",id);
    if(page && page.auth && this.user.user==null){
      logger.log("PageComponent: refresh:: Redirect to Login");
      if(this.route.snapshot.url.length>0){
        let s:string[] = [];
        this.route.snapshot.url.forEach(u=>s.push(u.path));
        sessionStorage.setItem("redirect",s.join("/"));
      }
      this.router.navigate(["login"]);
    }
    else if(page){
      this.page = page;
      if(page.header){
        this.app.header(page.header);
      }
      if(page.html){
        this.updateView();
      }
      if(page.style && page.style!=""){
        this.updateStyle(page.style);
      }
      if(page.script && page.script!=""){
        this.updateScript(page.script);
      }
    }else{
      this.router.navigate([""]);
    }
  }

  updateView(){
    var el= document.getElementById("3593661b72952004");
    logger.log("PageComponent: updateView::",el)
    if(el && this.page && this.page.html)el.innerHTML = this.page.html;
  }

  updateStyle(style:string){
    var el= document.getElementById("3593661b72952004");
    var st = document.createElement("style");
    st.innerText = style;
    if(el)el.appendChild(st);
  }

  updateScript(script:string){
    var el= document.getElementById("3593661b72952004");
    var sc = document.createElement("script");
    sc.innerText = script;
    if(el)el.appendChild(sc);
  }

  async save(){
    if(this.page){
      this.editPageModal=false;
      this.loader.show();
      await setDoc(doc(collection(this.firestore.firestore,"pages"), this.page.id),this.page);
      this.loader.hide();
      alert('Page Updated');
    }
  }

}


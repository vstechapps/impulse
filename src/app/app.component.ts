import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,LoaderComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  header:boolean =true;

  constructor(public router: Router){
    
  }
}

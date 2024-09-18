import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';
import { ConfigService } from '../config.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgIf],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.less'
})
export class LogoComponent {

  @Input()
  logo?:string;

  constructor(){
    
  }

}

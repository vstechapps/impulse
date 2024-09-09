import { Component } from '@angular/core';
import { Page } from '../app.models';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.less'
})
export class PagesComponent {

  pages:Page[] = [];

  constructor(private data:DataService, public router:Router){

  }




  ngOnInit(): void {
    this.pages = this.data.read("pages");
  }

}

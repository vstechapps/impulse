import { Component } from '@angular/core';
import { Page } from '../app.models';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [NgFor,TableComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.less'
})
export class PagesComponent {

  pages:Page[] = [];

  constructor(private data:DataService, public router:Router){

  }



  ngOnInit(): void {
    this.refresh();
  }

  async refresh(){
    this.pages = await this.data.read("pages");
  }

  navigate(p:Page){
    this.router.navigateByUrl("p/"+p.id);
  }

}

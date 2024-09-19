import { NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { logger } from '../logger.service';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.less'
})
export class DatatableComponent implements OnInit,OnChanges {

  @Input()
  data:any[] = [];

  @Input()
  cols?:string[];

  current:number=0;

  rows:number = 10;

  pages?:number;

  filtered:any[] = [];

  output:any[] = [];

  key?:string;

  constructor(){
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    logger.log("DatatableComponent: OnChanges",this);
    this.change(1);
    logger.log("DatatableComponent: OnChanges Complete",this);
    
  }


  ngOnInit(): void {
    logger.log("DatatableComponent: OnInit",this);
    logger.log("DatatableComponent: OnInit Complete",this);
  }
  

  change(page:number){
    if(page==this.current)return;
    let start = (page-1)*this.rows;
    this.search();
    this.output = this.filtered.slice(start, start+this.rows);
    
  }


  search(){
    if(this.key!=null && this.key!=""){
      this.filtered = this.data.filter(d=> (d.id!=null && d.id.indexOf(this.key)>-1) || (d.name!=null && d.name.indexOf(this.key)>-1));
    }else{
      this.filtered = this.data;
    }
    this.pages = Math.ceil(this.filtered.length/this.rows);
  }

  edit(){

  }

  delete(){

  }
}

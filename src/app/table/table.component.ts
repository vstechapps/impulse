import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Table } from '../app.models';
import { logger } from '../logger.service';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgIf,NgFor,UpperCasePipe,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.less'
})
export class TableComponent {

  @Input()
  table?:Table;

  @Output()
  action:EventEmitter<string> = new EventEmitter();

  data:any[] = [];

  current:number=0;

  rows:number = 10;

  pages?:number;

  filtered:any[] = [];

  output:any[] = [];

  key?:string;

  constructor(){
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    logger.log("TableComponent: OnChanges",this);
    this.data = this.table? this.table.data:[];
    this.search();
    logger.log("TableComponent: OnChanges Complete",this);
    
  }


  ngOnInit(): void {
    logger.log("TableComponent: OnInit",this);
    logger.log("TableComponent: OnInit Complete",this);
  }
  

  change(page:number){
    if(page==this.current)return;
    this.current = page;
    let start = (page)*this.rows;
    this.output = this.filtered.slice(start, start+this.rows);
  }


  search(){
    if(this.key!=null && this.key!=""){
      this.filtered = this.data.filter(d=> (d.id!=null && d.id.indexOf(this.key)>-1) || (d.name!=null && d.name.indexOf(this.key)>-1));
    }else{
      this.filtered = this.data;
    }
    this.pages = Math.ceil(this.filtered.length/this.rows);
    this.current=0;
    this.output = this.filtered.slice(0, this.rows);
    
  }

}

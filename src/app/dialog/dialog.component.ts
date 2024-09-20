import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from '../app.models';
import { NgIf } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { TableComponent } from '../table/table.component';
import { AppService } from '../app.service';
import { logger } from '../logger.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgIf,FormComponent,TableComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.less'
})
export class DialogComponent {

  @Input()
  dialog?:Dialog;

  @Output()
  action:EventEmitter<string> = new EventEmitter<string>();

  constructor(private app:AppService){
    this.app.$dialog.subscribe(d=>{
      this.dialog=d;
      logger.log("DialogComponent: Dialog Changed",this);
    });
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from '../app.models';
import { NgIf } from '@angular/common';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgIf,FormComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.less'
})
export class DialogComponent {

  @Input()
  dialog?:Dialog;

  @Output()
  action:EventEmitter<string> = new EventEmitter<string>();

}

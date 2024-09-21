import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Control, Form } from '../app.models';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule, NgClass],
  templateUrl: './form.component.html',
  styleUrl: './form.component.less'
})
export class FormComponent {
  expand:boolean=false;

  @Input()
  form?:Form;
  
  @Output()
  submit:EventEmitter<string> = new EventEmitter();

  update(c:Control,e:any) {
    c.value = e.target.value;
    this.expand=false;
  }

}

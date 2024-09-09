import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe,NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.less'
})
export class LoaderComponent {

  loading: BehaviorSubject<boolean>;

  constructor(private loader: LoaderService){
    this.loading = this.loader.loading;
  }

}

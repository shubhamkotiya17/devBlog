import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/service/loader.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService){
    // console.log('si loading --- ' , this.isLoading);
    
  }


}

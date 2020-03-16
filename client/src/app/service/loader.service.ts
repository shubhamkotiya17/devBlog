import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  isLoading = new Subject<boolean>();
  show() {
      this.isLoading.next(true);
      // console.log('ins show ', this.isLoading);
      
  }
  hide() {
      this.isLoading.next(false);
      // console.log('ins hide ', this.isLoading);

  }

}

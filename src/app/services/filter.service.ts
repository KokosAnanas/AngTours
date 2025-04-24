import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private showOnlyBasketSubject = new BehaviorSubject<boolean>(false);
  showOnlyBasket$ = this.showOnlyBasketSubject.asObservable();

  constructor() { }

  setShowOnlyBasket(value: boolean) {
    this.showOnlyBasketSubject.next(value);
  }
}

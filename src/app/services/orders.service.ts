import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {IOrder, IOrders} from '../models/orders';
import {API} from '../shared/api';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  #http = inject(HttpClient)

  constructor() { }

  getOrders(): Observable<IOrder[]> {
    return this.#http.get<IOrders>(API.orders)
      .pipe(
        map((res => res.orders)),
        catchError(err => of([]))
      )
  }
}


import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {IOrder, IOrders} from '../../models/orders';
import {Observable} from 'rxjs';
import {OrdersService} from '../../services/orders.service';
import {TouristCountPipe} from '../../shared/pipes/tourist-count.pipe';
import {FullNamePipe} from '../../shared/pipes/full-name.pipe';

@Component({
  selector: 'app-orders',
  imports: [
    AsyncPipe,
    TableModule,
    TouristCountPipe,
    FullNamePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  readonly orders$: Observable<IOrder[]> = inject(OrdersService).getOrders();

}


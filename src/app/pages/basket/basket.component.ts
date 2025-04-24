import {Component, inject} from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {TableModule} from 'primeng/table';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {ITour} from '../../models/tours';

@Component({
  selector: 'app-basket',
  imports: [TableModule, AsyncPipe, Button, RouterLink, DatePipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  basketItems$ = inject(BasketService).basketStore$
  private basketService = inject(BasketService)

  removeItem(tour: ITour) {
    this.basketService.removeItemFromBasket(tour);
  }
}

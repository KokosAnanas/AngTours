import {Component, inject} from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {TableModule} from 'primeng/table';
import {AsyncPipe} from '@angular/common';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {RouterLink} from '@angular/router';
import {ITour} from '../../models/tours';

@Component({
  selector: 'app-basket',
  imports: [TableModule, AsyncPipe, Button, RouterLink],
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

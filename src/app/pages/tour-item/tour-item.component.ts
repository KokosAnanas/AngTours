import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';
import {ITour} from '../../models/tours';
import {NearestTourComponent} from './nearest-tour/nearest-tour.component';

@Component({
  selector: 'app-tour-item',
  imports: [ Button, RouterLink, Card, PrimeTemplate, NearestTourComponent ],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss',
})
export class TourItemComponent implements OnInit {
  tourId: string = null;
  tour: ITour;

  constructor (private tourService: ToursService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    console.log('TourId', this.tourId);
    this.tourService.getTourById(this.tourId).subscribe(tour => {
      this.tour = tour;
    })
  }
}


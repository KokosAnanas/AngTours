import {Component, inject, Input, model, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ITour} from '../../../models/tours';
import {ToursService} from '../../../services/tours.service';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-nearest-tour',
  imports: [GalleriaModule],
  templateUrl: './nearest-tour.component.html',
  styleUrl: './nearest-tour.component.scss'
})
export class NearestTourComponent implements OnInit, OnChanges {
  @Input() tourNearest: ITour = null;

  tourService = inject(ToursService);
  toursArr = model<ITour[]>([]);

  ngOnInit(): void {
    console.log('tourNearest', this.tourNearest)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    const tour = changes['tourNearest']?.currentValue as ITour;

    if (tour?.locationId) {
      this.tourService.getNearestTourByLocationId(tour.locationId).subscribe((data) => {
        this.toursArr.set(data);
      })
    }
  }
}

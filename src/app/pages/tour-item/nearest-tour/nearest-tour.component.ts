import {Component, EventEmitter, inject, Input, model, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ITour} from '../../../models/tours';
import {ToursService} from '../../../services/tours.service';
import { GalleriaModule } from 'primeng/galleria';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-nearest-tour',
  imports: [GalleriaModule, NgOptimizedImage],
  templateUrl: './nearest-tour.component.html',
  styleUrl: './nearest-tour.component.scss'
})
export class NearestTourComponent implements OnInit, OnChanges {
  @Input() tourNearest: ITour = null;
  @Output() onTourChange = new EventEmitter<ITour>()

  tourService = inject(ToursService);
  toursArr = model<ITour[]>([]);
  activeLocationId: string

  ngOnInit(): void {
    console.log('tourNearest', this.tourNearest)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    const tour = changes['tourNearest']?.currentValue as ITour;

    if (tour?.locationId && this.activeLocationId !== tour?.locationId) {
      this.activeLocationId = tour?.locationId;
      this.tourService.getNearestTourByLocationId(this.activeLocationId).subscribe((data) => {
        this.toursArr.set(data);
      })
    }
  }

  activeIndexChange(index: number) {
    console.log('index', index);
    const tours = this.toursArr();
    const activeTour = tours.find((el, i) => i === index);
    this.onTourChange.emit(activeTour);
  }
}

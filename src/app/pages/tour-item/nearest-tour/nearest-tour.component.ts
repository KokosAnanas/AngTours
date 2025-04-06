import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  inject,
  Input,
  model,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ITour} from '../../../models/tours';
import {ToursService} from '../../../services/tours.service';
import { GalleriaModule } from 'primeng/galleria';
import {NgOptimizedImage} from '@angular/common';
import {Button} from 'primeng/button';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {InputGroup} from 'primeng/inputgroup';
import {fromEvent, Subscription} from 'rxjs';

@Component({
  selector: 'app-nearest-tour',
  imports: [GalleriaModule, NgOptimizedImage, Button, InputGroupAddon, InputText, InputGroup],
  templateUrl: './nearest-tour.component.html',
  styleUrl: './nearest-tour.component.scss'
})
export class NearestTourComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() tourNearest: ITour = null;
  @Output() onTourChange = new EventEmitter<ITour>()

  @ViewChild('searchInput') searchInput: ElementRef;

  tourService = inject(ToursService);
  toursArr = model<ITour[]>([]);
  toursArrCopy = model<ITour[]>([]);
  activeLocationId: string;
  subscription: Subscription;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    const tour = changes['tourNearest']?.currentValue as ITour;

    if (tour?.locationId && this.activeLocationId !== tour?.locationId) {
      this.activeLocationId = tour?.locationId;
      this.tourService.getNearestTourByLocationId(this.activeLocationId).subscribe((data) => {
        this.toursArr.set(data);
        this.toursArrCopy.set(data);
      })
    }
  }

  ngAfterViewInit(): void {
    console.log('searchInput afterView', this.searchInput)
    const eventObservable = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')

   this.subscription = eventObservable.subscribe((ev) => {
      const inputTargetValue = (ev.target as HTMLInputElement).value;
      console.log('inputTargetValue', inputTargetValue, this.toursArr())
      if (inputTargetValue === '') {
        this.toursArr.set(this.toursArrCopy());
      } else {
        const newTours = this.tourService.searchTours(this.toursArrCopy(), inputTargetValue);
        this.toursArr.set(newTours);
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  activeIndexChange(index: number) {
    console.log('index', index);
    const tours = this.toursArr();
    const activeTour = tours.find((el, i) => i === index);
    this.onTourChange.emit(activeTour);
  }


}

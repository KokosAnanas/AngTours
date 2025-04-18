import {Component, OnDestroy, OnInit} from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule } from 'primeng/card';
import {ActivatedRoute, Router} from '@angular/router';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Coords, ILocation, ITour} from '../../models/tours';
import {SearchPipe} from '../../shared/pipes/search.pipe';
import {FormsModule} from '@angular/forms';
import {HighlightActiveDirective} from '../../shared/directives/highlight-active.directive';
import {isValid} from 'date-fns';
import {Subject, takeUntil} from 'rxjs';
import {MapComponent} from '../../shared/component/map/map.component';
import { DialogModule } from 'primeng/dialog';
import {IWeatherData} from '../../models/map';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    InputGroup,
    InputGroupAddon,
    Button,
    InputText,
    SearchPipe,
    FormsModule,
    HighlightActiveDirective,
    MapComponent,
    DialogModule
  ],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
})

export class ToursComponent implements OnInit, OnDestroy {
  tours: ITour[] = []; // TODO add types
  toursStore: ITour[] = [];
  destroyer = new Subject<boolean>();
  showModal = false;
  location: ILocation = null;
  weatherData: IWeatherData | null = null;
  selectedTour: ITour = null;

  constructor(
    private toursService: ToursService,
    private route: ActivatedRoute,
    private router: Router,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {

    // Type
    this.toursService.TourType$.pipe(
      takeUntil(this.destroyer)

    ).subscribe((tour) =>{
      switch (tour.key) {
        case 'group':
          this.tours = this.toursStore.filter(el => el.type === 'group');
          break;
        case 'single':
          this.tours = this.toursStore.filter(el => el.type === 'single');
          break;
        case 'all':
          this.tours = [...this.toursStore];
          break;
      }
    })

    // Date
    this.toursService.TourDate$.pipe(
      takeUntil(this.destroyer)

    ).subscribe((date) => {
      this.tours = this.toursStore.filter((tour) => {
        if (isValid(new Date(tour.date))) {

          const tourDate = new Date(tour.date).setHours(0, 0, 0, 0); // обнуляем часы/...
          const calendarDate = new Date(date).setHours(0, 0, 0);
          return tourDate === calendarDate;
        } else {
          return false;
        }
      });
    })

    // console.log('activatedRoute', this.route)
    this.toursService.getTours().subscribe((data) => {
      if (Array.isArray(data)) {
        this.tours = data;
        this.toursStore = [...data];
      }
    });
  }

  goToTour(item: ITour): void { // TODO add interface
    this.router.navigate(['tour', item.id], {relativeTo: this.route});
  }

  searchTours(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const targetValue = target.value;
    this.tours = this.toursService.searchTours(this.toursStore, targetValue);
  }

  selectActive(index: number): void {
    console.log('index', index);
    const targetTour = this.tours.find((tour, i) => i === index);
    if (targetTour) {
      this.goToTour(targetTour);
    }
  }

  ngOnDestroy(): void {
    this.destroyer.next(true);
    this.destroyer.complete();
  }

  getCountryDetail(ev: MouseEvent, code: string, tour: ITour): void {
    ev.stopPropagation();
    this.toursService.getCountryByCode(code).subscribe((data) => {
      console.log('****new data', data);
      if (data) {
        const countrieInfo = data.countrieData;
        console.log('countryInfo', countrieInfo);
        this.location = {lat: countrieInfo.latlng[0], lng: countrieInfo.latlng[1]};
        this.weatherData = data.weatherData;
        this.selectedTour = tour;
        this.showModal = true;
      }
    })
  }

  removeTour(ev: MouseEvent, tour: ITour): void {
    ev.stopPropagation();
    this.toursService.deleteTourById(tour?.id).subscribe()
  }

  setItemToBasket(ev: Event, item: ITour): void {
    ev.stopPropagation();
    this.basketService.setItemToBasket(item);
  }
  removeItemFromBasket(ev: MouseEvent, item: ITour): void {
    ev.stopPropagation();
    this.basketService.removeItemFromBasket(item);
  }


}






















import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, delay, forkJoin, map, Observable, of, Subject, switchMap, tap, withLatestFrom} from 'rxjs';
import { API } from '../shared/api';
import {Coords, ICountriesResponseItem, IFilerTypeLogic, IOrderBody, ITour, ITourServerResponse} from '../models/tours';
import {IWeatherData, IWeatherResponse} from '../models/map';
import {MapService} from './map.service';
import {LoaderService} from './loader.service';
import {BasketService} from './basket.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  // type
  private TourTypeSubject = new Subject<IFilerTypeLogic>(); // TODO defined type
  readonly TourType$ = this.TourTypeSubject.asObservable();

  // date
  private TourDateSubject = new Subject<Date>();
  readonly TourDate$ = this.TourDateSubject.asObservable();

  constructor(private http: HttpClient,
              private mapService: MapService,
              private loaderService: LoaderService,
              private basketService: BasketService) { }

  getTours(): Observable<ITour[]> {

    // set loader
    this.loaderService.setLoader(true)

    const countries = this.http.get<ICountriesResponseItem[]>(API.countries);
    const tours = this.http.get<ITourServerResponse>(API.tours);
    const testObservale = of(1, 2, 3).pipe(
      delay(4000)
    );

    // parralel
    return forkJoin<[ICountriesResponseItem[], ITourServerResponse]>([countries, tours]).pipe(
      delay(1000),
      withLatestFrom(this.basketService.basketStore$),
      map(([data, basketData]) => {

        let toursWithCountries = [] as ITour[];
        const toursArr = data[1].tours;
        const countriesMap = new Map();

        data[0].forEach(country => {
          countriesMap.set(country.iso_code2, country);
        });

        if (Array.isArray(toursArr)) {
          toursWithCountries = toursArr.map((tour) => {
            const isTourInBasket = basketData.find((basketTour) => basketTour.id === tour.id);

            if (isTourInBasket) {
              tour.inBasket = true;
            }

            return {
              ...tour,
              country: countriesMap.get(tour.code) || null // add new prop
            }
          })
        }

        return toursWithCountries
      }),
      tap((data) => {
        // hide loader
        this.loaderService.setLoader(false)
      }),
      catchError((err) => {
        this.loaderService.setLoader(false)
        return of(null)
      })
    )
  }

  getTourById(id: string): Observable<ITour> { // TODO add types for response
    const tourApi = API.tour;
    const path = API.tour+'/'+id; // альтернативный способ
    return this.http.get<ITour>(`${tourApi}/${id}`)
  }

  deleteTourById(id: string): Observable<ITour> { // TODO add types for response
    const tourApi = API.tour;
    const path = API.tour+'/'+id; // альтернативный способ
    return this.http.delete<ITour>(`${tourApi}/${id}`)
  }

  getNearestTourByLocationId(id: string): Observable<ITour[]> {
    return this.http.get<ITour[]>(API.nearestTours, {
      params: {locationId:id}
    });
  }

  searchTours(tours: ITour[], value: string): ITour[] {
    if (Array.isArray(tours)) {
      return tours.filter((tour) => {

        if (tour && typeof tour.name === 'string') {
          return tour.name.toLowerCase().includes(value.toLowerCase());
        } else {
          return false;
        }
      });
    } else {
      return [];
    }
  }

  initChangeTourType(val: IFilerTypeLogic): void { //TODO defined type
    this.TourTypeSubject.next(val);
  }

  initChangeTourDate(val: Date): void {   //TODO defined type
    this.TourDateSubject.next(val);
  }

  getCountryByCode(code: string): Observable<any> {    //TODO add types

    return this.http.get<Coords[]>(API.countryByCode, {params: {codes:code}}).pipe(

      //send new data
      map((countrieDataArr) => countrieDataArr[0]), // countrieDataArr - data from sours Observable

      // send new Observable
      switchMap(countrieData => {    // countrieData - данные, полученные из предыдущего оператора map
        console.log('countrieData', countrieData);
        const coords = {lat: countrieData.latlng[0], lng: countrieData.latlng[1]};

        // new Observable
        return this.mapService.getWeather(coords).pipe(

          map((weatherResponse: IWeatherResponse) => {   // weatherResponse data from this.mapService.getWeather(Coords)
            const current = weatherResponse.current;
            const hourly = weatherResponse.hourly;

            const weatherData: IWeatherData = {
              isDay: current.is_day,
              snowfall: current.snowfall,
              rain: current.rain,
              currentWeather: hourly.temperature_2m[15] // индекс 15 - температура днём
            }

            console.log('weatherData', weatherData);
            return {countrieData, weatherData}; // return new data for new outer Observable
          })
        )

      })

    );
  }

  postOrder(orderBody: IOrderBody): Observable<string> { // TODO add interfaces
    return this.http.post<string>(API.order, orderBody);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {delay, forkJoin, map, Observable, of, Subject} from 'rxjs';
import { API } from '../shared/api';
import {ICountriesResponseItem, ITour, ITourServerResponse} from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  // type
  private TourTypeSubject = new Subject<any>(); // TODO defined type
  readonly TourType$ = this.TourTypeSubject.asObservable();

  // date
  private TourDateSubject = new Subject<Date>();
  readonly TourDate$ = this.TourDateSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTours(): Observable<ITour[]> {
    const countries = this.http.get<ICountriesResponseItem[]>(API.countries);
    const tours = this.http.get<ITourServerResponse>(API.tours);
    const testObservale = of(1, 2, 3).pipe(
      delay(4000)
    );

    // parralel
    return forkJoin<[ICountriesResponseItem[], ITourServerResponse]>([countries, tours]).pipe(
      map((data) => {

        let toursWithCountries = [] as ITour[];
        const toursArr = data[1].tours;
        const countriesMap = new Map();

        data[0].forEach(country => {
          countriesMap.set(country.iso_code2, country);
        });

        if (Array.isArray(toursArr)) {
          toursWithCountries = toursArr.map((tour) => {
            return {
              ...tour,
              countries: countriesMap.get(tour.code) || null // add new prop
            }
          })
        }

        return toursWithCountries
      })
    )
  }

  getTourById(id: string): Observable<ITour> { // TODO add types for response
    const tourApi = API.tour;
    const path = API.tour+'/'+id; // альтернативный способ
    return this.http.get<ITour>(`${tourApi}/${id}`)
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

  initChangeTourType(val: any): void { //TODO defined type
    this.TourTypeSubject.next(val);
  }

  initChangeTourDate(val: Date): void {   //TODO defined type
    this.TourDateSubject.next(val);
  }

}

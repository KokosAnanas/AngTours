import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { API } from '../shared/api';
import {ITour, ITourServerResponse} from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private TourTypeSubject = new Subject<any>(); // TODO defined type
  readonly TourType$ = this.TourTypeSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTours(): Observable<ITourServerResponse> { // TODO add types for response
    return this.http.get<ITourServerResponse>(API.tours);
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

}

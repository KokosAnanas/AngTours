import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/api';
import {ITour, ITourServerResponse} from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  getTours(): Observable<ITourServerResponse> { // TODO add types for response
    return this.http.get<ITourServerResponse>(API.tours);
  }

  getTourById(id: string): Observable<ITour> { // TODO add types for response
    const tourApi = API.tour;
    const path = API.tour+'/'+id; // альтернативный способ
    return this.http.get<ITour>(`${tourApi}/${id}`)
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

}

import { IRestaurant } from './iRestaurant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtTestService {
  public restaurants = new BehaviorSubject<IRestaurant>({
    id: 0,
    uid: null,
    name: null,
    type: null,
    description: null,
    review: null,
    logo: null,
    phone_number: null,
    address: null,
    hours: null,
  });

  constructor(private httpClient: HttpClient) {}

  getRestaurants(): any {
    this.httpClient
      .get<any>(`https://random-data-api.com/api/restaurant/random_restaurant`)
      .subscribe({
        complete: () => {},
        next: (res) => {
          this.restaurants.next(res);
        },
        error: (error) => {
          this.restaurants.next(null);
        },
      });
  }
}

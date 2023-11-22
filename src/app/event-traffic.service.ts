// event-traffic.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventTrafficService {
  private apiUrl = 'YOUR_API_URL';

  constructor(private http: HttpClient) {}

  getCityEvents(city: string): Observable<any> {
    // Implement logic to fetch events data for the city from the API
    const eventsUrl = `${this.apiUrl}/events?city=${city}`;
    return this.http.get(eventsUrl);
  }

  getTrafficUpdates(city: string): Observable<any> {
    // Implement logic to fetch traffic updates for the city from the API
    const trafficUrl = `${this.apiUrl}/traffic?city=${city}`;
    return this.http.get(trafficUrl);
  }
}

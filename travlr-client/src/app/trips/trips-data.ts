import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';

@Injectable({
  providedIn: 'root',
})
export class TripsData {

  private apiBaseUrl = 'http://localhost:3000/api'; // Express API

  constructor(private http: HttpClient) {}

  // GET all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }

  // GET single trip (optional, but handy)
  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/trips/${code}`);
  }

  // POST: add trip
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}/trips`, trip);
  }

  // PUT: update trip
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}/trips/${trip.code}`, trip);
  }

  // DELETE: delete trip
  deleteTrip(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/trips/${code}`);
  }
}


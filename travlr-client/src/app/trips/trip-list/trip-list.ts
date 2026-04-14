import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Trip } from '../trip';
import { TripsData } from '../trips-data';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css']
})
export class TripListComponent implements OnInit {

  trips: Trip[] = [];

  newTrip: Trip = {
    code: '',
    name: '',
    price: '',
    description: ''
  };

  constructor(
    private tripsService: TripsData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('TripListComponent ngOnInit');
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripsService.getTrips().subscribe({
      next: (trips: Trip[]) => {
        console.log('Trips from API (inside subscribe):', trips);
        this.trips = trips;
        console.log('this.trips after assign:', this.trips);

        // make absolutely sure the UI refreshes
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading trips', err)
    });
  }

  onAddTrip(): void {
    console.log('onAddTrip called with', this.newTrip);

    this.tripsService.addTrip(this.newTrip).subscribe({
      next: (added: Trip) => {
        console.log('Trip added from API:', added);
        this.trips.push(added);
        this.newTrip = {
          code: '',
          name: '',
          price: '',
          description: ''
        };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error adding trip', err)
    });
  }
}

import { Routes } from '@angular/router';
import { TripListComponent } from './trips/trip-list/trip-list';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent }
];

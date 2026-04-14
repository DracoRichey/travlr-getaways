import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trip } from '../trip';
import { TripsData } from '../trips-data';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-edit.html',
  styleUrls: ['./trip-edit.css']
})
export class TripEditComponent {
  @Input() trip!: Trip;
  @Output() saved = new EventEmitter<Trip>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(private tripsService: TripsData) {}

  onSave(): void {
    this.tripsService.updateTrip(this.trip).subscribe(updated => {
      this.saved.emit(updated);
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}

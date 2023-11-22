import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private selectedDaySource = new BehaviorSubject<string | null>(null);
  selectedDay$ = this.selectedDaySource.asObservable();

  setSelectedDay(selectedDay: string): void {
    this.selectedDaySource.next(selectedDay);
  }
}

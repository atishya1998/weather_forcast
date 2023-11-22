import { Component } from '@angular/core';
import { AppStateService } from './app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  constructor(private appStateService: AppStateService) {}
  resetApp(): void {
    // Clear the selected day when the app is reset
    this.appStateService.setSelectedDay(" ");
  }
}

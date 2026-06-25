import { Component } from '@angular/core';
import { of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.html',
})
export class Airport {
  dashboard: any;
  loading = true;

  flight$ = of({
    status: 'On Time',
  });
  weather$ = of({
    temperature: 30,
  });
  gate$ = of({
    number: 'A20',
  });
  constructor() {
    forkJoin({
      flight: this.flight$,
      weather: this.weather$,
      gate: this.gate$,
    }).subscribe({
      next: (data) => {
        console.log(data);
        this.dashboard = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

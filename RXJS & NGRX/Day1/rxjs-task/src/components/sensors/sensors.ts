import { Component, signal } from '@angular/core';
import { Observable, merge } from 'rxjs';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.html',
})
export class Sensors {
  temperature = signal(0);
  traffic = signal(0);
  status = signal('Monitoring...');

  temperatureSensor$ = new Observable((observer) => {
    const intervalId = setInterval(() => {
      observer.next({
        type: 'temperature',
        value: Math.floor(Math.random() * 40),
      });
    }, 1000);

    const stopTimer = setTimeout(() => {
      observer.complete();
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(stopTimer);
      console.log('Temperature sensor stopped');
    };
  });

  trafficSensor$ = new Observable((observer) => {
    const intervalId = setInterval(() => {
      observer.next({
        type: 'traffic',
        value: Math.floor(Math.random() * 100),
      });
    }, 2000);

    const stopTimer = setTimeout(() => {
      observer.complete();
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(stopTimer);
      console.log('Traffic sensor stopped');
    };
  });

  constructor() {
    const sensors$ = merge(this.temperatureSensor$, this.trafficSensor$);

    sensors$.subscribe({
      next: (sensor: any) => {
        if (sensor.type === 'temperature') {
          this.temperature.set(sensor.value);
        }
        if (sensor.type === 'traffic') {
          this.traffic.set(sensor.value);
        }
      },

      complete: () => {
        this.status.set('Monitoring stopped');
        console.log('All sensors completed');
      },
    });
  }
}

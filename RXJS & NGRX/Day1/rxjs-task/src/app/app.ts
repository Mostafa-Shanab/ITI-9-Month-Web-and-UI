import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Warehouse } from '../components/warehouse/warehouse';
import { Airport } from '../components/airport/airport';
import { Sensors } from '../components/sensors/sensors';
import { Learning } from '../components/learning/learning';

@Component({
  selector: 'app-root',
  imports: [Warehouse, Airport, Sensors, Learning],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('rxjs-task');
}

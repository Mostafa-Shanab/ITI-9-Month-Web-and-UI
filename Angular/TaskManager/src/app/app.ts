import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskInputComponent } from './components/task-input/task-input';
import { CarouselComponent } from './components/carousel/carousel';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    TaskListComponent,
    TaskInputComponent,
    CarouselComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TaskManager');
}

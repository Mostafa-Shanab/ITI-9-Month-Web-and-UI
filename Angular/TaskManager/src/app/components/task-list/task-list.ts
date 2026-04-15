import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskCardComponent],
})
export class TaskListComponent {}

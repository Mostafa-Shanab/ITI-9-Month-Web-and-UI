import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card';
import { Task } from '../../types';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.html',
  styleUrl: './task-view.css',
  imports: [TaskCardComponent],
})
export class TaskViewComponent implements OnDestroy {
  @Input() tasks: Task[] = [];
  @Input() view: 'all' | 'done' | 'notDone' = 'all';
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();
  @Output() componentClosed = new EventEmitter<'all' | 'done' | 'notDone'>();

  get filteredTasks(): Task[] {
    if (this.view === 'done') {
      return this.tasks.filter((task) => task.done);
    }

    if (this.view === 'notDone') {
      return this.tasks.filter((task) => !task.done);
    }

    return this.tasks;
  }

  ngOnDestroy(): void {
    this.componentClosed.emit(this.view);
  }

  deleteTask(id: string): void {
    this.delete.emit(id);
  }

  toggleDone(id: string): void {
    this.toggle.emit(id);
  }

  editTask(task: Task): void {
    this.edit.emit(task);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card';
import { Task } from '../../types';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskCardComponent],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();

  selectedTab: 'all' | 'done' | 'notDone' = 'all';

  get filteredTasks(): Task[] {
    if (this.selectedTab === 'done') {
      return this.tasks.filter((t) => t.done);
    }

    if (this.selectedTab === 'notDone') {
      return this.tasks.filter((t) => !t.done);
    }

    return this.tasks;
  }

  get stats() {
    return {
      total: this.tasks.length,
      done: this.tasks.filter((t) => t.done).length,
      pending: this.tasks.filter((t) => !t.done).length,
    };
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }

  onToggle(id: string) {
    this.toggle.emit(id);
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }
}

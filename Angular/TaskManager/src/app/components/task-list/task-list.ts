import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskViewComponent } from '../task-view/task-view';
import { Task } from '../../types';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskViewComponent],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() notify = new EventEmitter<{ msg: string; type: string }>();
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();

  selectedTab: 'all' | 'done' | 'notDone' = 'all';
  @Output() viewClosed = new EventEmitter<'all' | 'done' | 'notDone'>();

  get filteredTasks(): Task[] {
    if (this.selectedTab === 'done') {
      return this.tasks.filter((t) => t.done);
    } else if (this.selectedTab === 'notDone') {
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

  onDeleteTask(id: string) {
    this.delete.emit(id);
  }

  onToggleTask(id: string) {
    this.toggle.emit(id);
  }

  onEditTask(task: Task) {
    this.edit.emit(task);
  }

  onViewClosed(view: 'all' | 'done' | 'notDone') {
    this.viewClosed.emit(view);
  }
}

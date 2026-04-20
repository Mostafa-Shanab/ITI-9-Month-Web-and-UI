import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TaskViewComponent } from '../task-view/task-view';
import { Task } from '../../types';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [TaskViewComponent],
})
export class TaskListComponent implements OnChanges {
  @Input() incomingTask?: Task;
  @Input() incomingUpdate?: Task;
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() notify = new EventEmitter<{ msg: string; type: string }>();
  @Output() edit = new EventEmitter<Task>();
  @Output() viewClosed = new EventEmitter<'all' | 'done' | 'notDone'>();

  tasks: Task[] = [];
  selectedTab: 'all' | 'done' | 'notDone' = 'all';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incomingTask'] && changes['incomingTask'].currentValue) {
      this.addTask(changes['incomingTask'].currentValue);
    }

    if (changes['incomingUpdate'] && changes['incomingUpdate'].currentValue) {
      this.updateTask(changes['incomingUpdate'].currentValue);
    }
  }

  get stats() {
    return {
      total: this.tasks.length,
      done: this.tasks.filter((t) => t.done).length,
      pending: this.tasks.filter((t) => !t.done).length,
    };
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.taskDeleted.emit(id);
    this.notify.emit({ msg: 'Task deleted', type: 'error' });
  }

  toggleDone(id: string) {
    const task = this.tasks.find((taskItem) => taskItem.id === id);
    if (task) {
      task.done = !task.done;
      this.notify.emit({
        msg: task.done ? 'Task marked done' : 'Task marked not done',
        type: 'info',
      });
    }
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }

  onViewClosed(view: 'all' | 'done' | 'notDone') {
    this.viewClosed.emit(view);
  }

  private addTask(task: Task) {
    this.tasks = [task, ...this.tasks];
    this.notify.emit({ msg: 'Task added successfully', type: 'success' });
  }

  private updateTask(task: Task) {
    const index = this.tasks.findIndex((item) => item.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.notify.emit({ msg: 'Task updated successfully', type: 'info' });
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../types';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();

  deleteTask() {
    this.delete.emit(this.task.id);
  }

  toggleDone() {
    this.toggle.emit(this.task.id);
  }

  editTask() {
    this.edit.emit(this.task);
  }
}

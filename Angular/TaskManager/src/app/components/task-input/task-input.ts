import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../types';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-input.html',
  styleUrl: './task-input.css',
})
export class TaskInputComponent {
  private _editingTask: Task | undefined;

  @Input()
  set editingTask(task: Task | undefined) {
    this._editingTask = task;
    if (task) {
      this.title = task.title;
      this.description = task.description;
      this.priority = task.priority;
      this.dueDate = task.dueDate;
      this.category = task.category;
      this.tags = task.tags;
      this.done = task.done;
      this.taskId = task.id;
    }
  }

  get editingTask(): Task | undefined {
    return this._editingTask;
  }

  @Output() add = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() notify = new EventEmitter<{ msg: string; type: string }>();

  // Simple form fields using ngModel
  title = '';
  description = '';
  priority: 'Low' | 'Medium' | 'High' = 'Low';
  dueDate = '';
  category: 'Work' | 'Personal' | 'Study' = 'Work';
  tags = '';
  done = false;
  taskId = '';

  addTask(): void {
    if (!this.title.trim()) {
      this.notify.emit({ msg: 'Please enter a title', type: 'warning' });
      return;
    }

    const task: Task = {
      id: this.taskId || uuidv4(),
      title: this.title,
      description: this.description,
      priority: this.priority,
      dueDate: this.dueDate,
      category: this.category,
      tags: this.tags,
      done: this.done,
    };

    if (this.taskId) {
      this.update.emit(task);
    } else {
      this.add.emit(task);
    }

    this.resetForm();
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.priority = 'Low';
    this.dueDate = '';
    this.category = 'Work';
    this.tags = '';
    this.done = false;
    this.taskId = '';
  }
}

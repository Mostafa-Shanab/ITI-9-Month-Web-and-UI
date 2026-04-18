import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../types';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-input',
  imports: [FormsModule],
  templateUrl: './task-input.html',
  styleUrl: './task-input.css',
})
export class TaskInputComponent {
  private _editingTask?: Task;

  @Input()
  set editingTask(task: Task | undefined) {
    this._editingTask = task;
    if (task) {
      this.currentTask = { ...task };
      this.editing = true;
    } else {
      this.resetForm();
    }
  }

  get editingTask(): Task | undefined {
    return this._editingTask;
  }

  @Output() add = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();
  @Output() notify = new EventEmitter<{ msg: string; type: string }>();

  currentTask: Task = this.emptyTask();
  editing = false;

  addTask(): void {
    const updatedTask: Task = {
      ...this.currentTask,
      id: this.editing && this.currentTask.id ? this.currentTask.id : uuidv4(),
    };

    for (const p in updatedTask) {
      const key = p as keyof Task;
      if (updatedTask[key] === '') {
        this.notify.emit({ msg: `Please fill required fields: ${key}`, type: 'warning' });
        return;
      }
    }

    if (this.editing) {
      this.update.emit(updatedTask);
    } else {
      this.add.emit(updatedTask);
    }

    this.resetForm();
  }

  cancelEdit(): void {
    this.cancel.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.currentTask = this.emptyTask();
    this.editing = false;
  }

  private emptyTask(): Task {
    return {
      id: '',
      title: '',
      description: '',
      priority: 'Low',
      dueDate: '',
      category: 'Work',
      tags: '',
      done: false,
    };
  }
}

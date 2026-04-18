import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskInputComponent } from './components/task-input/task-input';
import { CarouselComponent } from './components/carousel/carousel';
import { NotificationComponent } from './components/notification/notification';
import { Task } from './types';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    TaskListComponent,
    TaskInputComponent,
    CarouselComponent,
    NotificationComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  tasks: Task[] = [];
  editingTask: Task | undefined;

  notification = {
    msg: '',
    type: '',
  };

  addTask(task: Task) {
    this.tasks = [task, ...this.tasks];
    this.showNotification('Task added successfully', 'success');
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    if (this.editingTask?.id === id) {
      this.editingTask = undefined;
    }
    this.showNotification('Task deleted', 'error');
  }

  toggleDone(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.done = !task.done;
      this.showNotification(task.done ? 'Task marked done' : 'Task marked not done', 'info');
    }
  }

  startEdit(task: Task) {
    this.editingTask = { ...task };
    this.showNotification('Editing task details', 'info');
  }

  cancelEdit() {
    this.editingTask = undefined;
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.editingTask = undefined;
      this.showNotification('Task updated successfully', 'info');
    }
  }

  showNotification(msg: string, type: string) {
    this.notification = { msg, type };
    setTimeout(() => (this.notification.msg = ''), 3000);
  }
}

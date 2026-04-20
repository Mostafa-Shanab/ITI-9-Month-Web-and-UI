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
  editingTask: Task | undefined;
  taskToAdd: Task | undefined;
  taskToUpdate: Task | undefined;

  notification = {
    msg: '',
    type: '',
  };

  addTask(task: Task) {
    this.taskToAdd = { ...task };
    this.taskToUpdate = undefined;
  }

  updateTask(task: Task) {
    this.taskToUpdate = { ...task };
    this.taskToAdd = undefined;
  }

  startEdit(task: Task) {
    this.editingTask = { ...task };
    this.showNotification('Editing task details', 'info');
  }

  cancelEdit() {
    this.editingTask = undefined;
  }

  clearEditingIfDeleted(id: string) {
    if (this.editingTask?.id === id) {
      this.editingTask = undefined;
    }
  }

  handleTaskListNotification(event: { msg: string; type: string }) {
    this.showNotification(event.msg, event.type);
  }

  handleViewClosed(view: 'all' | 'done' | 'notDone') {
    const label = view === 'notDone' ? 'Not Done' : view.charAt(0).toUpperCase() + view.slice(1);
    this.showNotification(`${label} view closed`, 'info');
  }

  private showNotification(msg: string, type: string) {
    this.notification = { msg, type };
    setTimeout(() => (this.notification.msg = ''), 3000);
  }
}

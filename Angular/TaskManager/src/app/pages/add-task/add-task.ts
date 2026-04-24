import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskInputComponent } from '../../components/task-input/task-input';
import { NotificationComponent } from '../../components/notification/notification';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { Task } from '../../types';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [TaskInputComponent, NotificationComponent],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTaskComponent {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  editingTask = signal<Task | undefined>(undefined);

  onNotify(event: { msg: string; type: string }) {
    this.notificationService.show(event.msg, event.type as any);
  }

  onTaskAdd(task: Task) {
    this.apiService.createTask(task).subscribe({
      next: () => {
        this.notificationService.success('Task created successfully');
        setTimeout(() => this.router.navigate(['/lists']), 1500);
      },
      error: () => this.notificationService.error('Failed to create task'),
    });
  }

  onTaskUpdate(task: Task) {
    this.apiService.updateTask(task).subscribe({
      next: () => {
        this.notificationService.success('Task updated successfully');
        setTimeout(() => this.router.navigate(['/lists']), 1500);
      },
      error: () => this.notificationService.error('Failed to update task'),
    });
  }
}

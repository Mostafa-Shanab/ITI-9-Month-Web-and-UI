import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskListComponent } from '../../components/task-list/task-list';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { Task } from '../../types';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class ListsComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  tasks = signal<Task[]>([]);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.apiService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      },
      error: () => {
        this.notificationService.error('Failed to load tasks');
      },
    });
  }

  onNotify(event: { msg: string; type: string }) {
    this.notificationService.show(event.msg, event.type as any);
  }

  onTaskDeleted(id: string) {
    this.apiService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter((t) => t.id !== id));
        this.notificationService.success('Task deleted');
      },
      error: () => {
        this.notificationService.error('Failed to delete task');
      },
    });
  }

  onTaskToggle(id: string) {
    const task = this.tasks().find((t) => t.id === id);
    if (task) {
      this.apiService.toggleTaskStatus(id, !task.done).subscribe({
        next: (updatedTask) => {
          this.tasks.set(this.tasks().map((t) => (t.id === id ? updatedTask : t)));
          this.notificationService.success(
            updatedTask.done ? 'Task marked done' : 'Task marked not done',
          );
        },
        error: () => {
          this.notificationService.error('Failed to update task');
        },
      });
    }
  }

  onTaskEdit(task: Task) {
    this.router.navigate(['/add-task'], { state: { task } });
  }
}

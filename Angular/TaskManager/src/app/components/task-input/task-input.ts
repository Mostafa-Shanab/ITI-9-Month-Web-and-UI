import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  category: 'Work' | 'Personal' | 'Study';
  tags: string;
}

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-input.html',
  styleUrl: './task-input.css',
})
export class TaskInputComponent {
  title: string = '';
  description: string = '';
  priority: Task['priority'] = 'Low';
  dueDate: string = '';
  category: Task['category'] = 'Work';
  tags: string = '';

  tasks: Task[] = [];

  addTask(): void {
    const newTask: Task = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      dueDate: this.dueDate,
      category: this.category,
      tags: this.tags,
    };

    this.tasks.push(newTask);

    console.log(this.tasks);

    this.resetForm();
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.priority = 'Low';
    this.dueDate = '';
    this.category = 'Work';
    this.tags = '';
  }
}

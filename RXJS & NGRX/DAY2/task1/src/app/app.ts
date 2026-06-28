import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { StudentsService, Student } from './services/students';
import { StudentCard } from './components/student-card/student-card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [StudentCard],
})
export class App implements OnInit, OnDestroy {
  studentsService = inject(StudentsService);

  students: Student[] = [];
  departments: string[] = [];
  loading = false;
  error: string | null = null;

  private subs: Subscription[] = [];

  ngOnInit() {
    // Subscribe to shared state BehaviorSubject
    this.subs.push(
      this.studentsService.students$.subscribe((list) => {
        this.students = list;
      })
    );

    // Subscribe to departments list
    this.subs.push(
      this.studentsService.departments$.subscribe((depts) => {
        this.departments = depts;
      })
    );

    // Subscribe to loading status
    this.subs.push(
      this.studentsService.loading$.subscribe((isLoading) => {
        this.loading = isLoading;
      })
    );

    // Subscribe to errors
    this.subs.push(
      this.studentsService.error$.subscribe((errMessage) => {
        this.error = errMessage;
      })
    );
  }

  // Handle keyup / input event for search
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.studentsService.search$.next(input.value);
  }

  // Handle department filter dropdown change
  onFilter(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.studentsService.filter$.next(select.value);
  }

  // Handle refresh button click
  onRefresh() {
    this.studentsService.refreshData();
  }

  ngOnDestroy() {
    // Unsubscribe from all to prevent memory leaks
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

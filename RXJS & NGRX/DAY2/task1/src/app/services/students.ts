import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, combineLatest, of } from 'rxjs';
import { map, switchMap, tap, catchError, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  gender: string;
  age: number;
  phone: string;
  company?: {
    department?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private http = inject(HttpClient);

  // Shared state: BehaviorSubject storing current students list
  private studentsSubj$ = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubj$.asObservable();

  // All available departments for dropdown
  private departmentsSubj$ = new BehaviorSubject<string[]>([]);
  departments$ = this.departmentsSubj$.asObservable();

  // Loading state
  private loadingSubj$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubj$.asObservable();

  // Error state
  private errorSubj$ = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubj$.asObservable();

  // Event Subjects
  search$ = new Subject<string>();
  filter$ = new Subject<string>();
  refresh$ = new Subject<void>();

  // A trigger for API loading
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  // Raw students stream - fetches from API whenever refreshTrigger$ emits
  private rawStudents$ = this.refreshTrigger$.pipe(
    tap(() => {
      this.loadingSubj$.next(true);
      this.errorSubj$.next(null);
    }),
    switchMap(() => {
      return this.http.get<{ users: Student[] }>('https://dummyjson.com/users?limit=100').pipe(
        tap((response) => {
          // Extract and update all unique departments
          const depts = Array.from(
            new Set(response.users.map((u) => u.company?.department).filter((d): d is string => !!d))
          );
          this.departmentsSubj$.next(depts.sort());
        }),
        catchError((err) => {
          this.errorSubj$.next(err.message || 'Failed to fetch students data. Please check your connection or API status.');
          return of({ users: [] as Student[] });
        }),
        tap(() => this.loadingSubj$.next(false))
      );
    }),
    map((res) => res.users)
  );

  constructor() {
    this.initPipeline();
  }

  private initPipeline() {
    const searchQuery$ = this.search$.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    );

    const deptFilter$ = this.filter$.pipe(
      startWith('')
    );

    // Combine the raw users list with latest search and filter inputs
    combineLatest([this.rawStudents$, searchQuery$, deptFilter$]).pipe(
      map(([users, search, dept]) => {
        let list = users;

        // Filter by name
        if (search.trim()) {
          const query = search.toLowerCase();
          list = list.filter((u) =>
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(query)
          );
        }

        // Filter by department
        if (dept) {
          list = list.filter((u) => u.company?.department === dept);
        }

        return list;
      })
    ).subscribe({
      next: (students) => {
        this.studentsSubj$.next(students);
      },
      error: (err) => {
        console.error('Pipeline subscription error:', err);
      }
    });
  }

  // Method to trigger a manual refresh
  refreshData() {
    this.refreshTrigger$.next();
  }
}

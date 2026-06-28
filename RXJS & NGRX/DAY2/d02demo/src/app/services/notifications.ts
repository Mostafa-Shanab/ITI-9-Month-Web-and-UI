import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  // sub!: Subscriber<Notification>;
  // obs$ = new Observable((subscriber) => {
  //   this.sub = subscriber; // is Subject
  // });

  // subject$ = new Subject<Notification>();
  subject$ = new BehaviorSubject<Notification>({
    id: 0,
    title: '',
    message: '',
    type: 'info',
    createdAt: new Date(),
  });
  sendData(note: Notification) {
    this.subject$.next(note);
  }
}

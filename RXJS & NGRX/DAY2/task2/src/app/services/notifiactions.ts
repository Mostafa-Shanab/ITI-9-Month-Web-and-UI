import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { Notification } from '../types/notification';

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  // subscriber!: Subscriber<Notification>;
  // notification$ = new Observable((subscriber) => {
  //   // ele.addEventListener("click" , (e)=>{
  //   //   subscriber.next(e)
  //   // })

  //   this.subscriber = subscriber; // this is actullay a subject 😊
  // });

  //  private notificationSubj$ = new `Subject`<Notification>();
  private notificationSubj$ = new BehaviorSubject<Notification | null>(null);
  notificationObs$ = this.notificationSubj$.asObservable();
  sendNotification(notification: Notification) {
    // this.subscriber.next(notification);
    this.notificationSubj$.next(notification);
  }
}

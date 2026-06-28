import { Component, inject } from '@angular/core';
import { Notifications } from '../../services/notifiactions';
import { Notification } from '../../types/notification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  notificationServ = inject(Notifications);
  notifications: Notification[] = [];

  ngOnInit() {
    this.notificationServ.notificationObs$.subscribe((v) => {
      if (v) {
        this.notifications.unshift(v);
      }
    });
  }
}

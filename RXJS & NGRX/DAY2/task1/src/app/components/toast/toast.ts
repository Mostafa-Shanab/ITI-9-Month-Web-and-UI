import { Component, inject } from '@angular/core';
import { Notifications } from '../../services/notifiactions';
import { Notification } from '../../types/notification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [DatePipe],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  notification: Notification | null = null;
  notificationServ = inject(Notifications);
  ngOnInit() {
    this.notificationServ.notificationObs$.subscribe((v) => {
      this.notification = v;
    });
  }
}

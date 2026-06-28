import { Component, inject } from '@angular/core';
import { Notifications } from '../../services/notifiactions';

@Component({
  selector: 'app-sender',
  imports: [],
  templateUrl: './sender.html',
  styleUrl: './sender.css',
})
export class Sender {
  notificationServ = inject(Notifications);
  id = 0;
  sendNotification() {
    this.notificationServ.sendNotification({
      id: ++this.id,
      message: 'this is message' + ' ' + this.id,
      title: 'New Meassage' + ' ' + this.id,
      type: 'error',
      createdAt: new Date(),
    });
  }
}

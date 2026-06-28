import { Component, inject } from '@angular/core';
import { Notifications } from '../../services/notifications';

@Component({
  selector: 'app-sender',
  imports: [],
  templateUrl: './sender.html',
  styleUrl: './sender.css',
})
export class Sender {
  noteServ = inject(Notifications);
  id = 0;
  sendNotification() {
    this.noteServ.sendData({
      id: ++this.id,
      title: 'Title ' + this.id,
      message: 'messgae ' + this.id,
      type: 'warning',
      createdAt: new Date(),
    });
  }
}

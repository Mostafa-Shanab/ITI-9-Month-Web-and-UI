import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Notification, Notifications } from '../../services/notifications';

@Component({
  selector: 'app-history',
  imports: [DatePipe, JsonPipe],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  noteServ = inject(Notifications);
  note: Notification[] = [];
  ngOnInit() {
    this.noteServ.subject$.subscribe((v: Notification) => {
      this.note.unshift(v);
      console.log(v);
    });
  }
}

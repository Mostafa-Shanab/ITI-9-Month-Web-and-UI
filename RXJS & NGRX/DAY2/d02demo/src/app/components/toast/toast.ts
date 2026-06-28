import { Component, inject } from '@angular/core';
import { Notification, Notifications } from '../../services/notifications';
import { DatePipe, JsonPipe } from '@angular/common';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  imports: [JsonPipe, DatePipe],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  noteServ = inject(Notifications);
  note: Notification | null = null;

  un!: Subscription;
  ngOnInit() {
    this.un = this.noteServ.subject$.subscribe((v) => {
      console.log(v);
      this.note = v;
    });
  }

  ngOnDestroy() {
    this.un.unsubscribe();
  }
}

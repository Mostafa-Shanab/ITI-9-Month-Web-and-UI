import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {
  @Input() message = '';
  @Input() type = '';
}

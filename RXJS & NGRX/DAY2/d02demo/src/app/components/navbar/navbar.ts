import { Component, inject } from '@angular/core';
import { Notifications } from '../../services/notifications';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  noteServ = inject(Notifications);
  notificationCount = 0;
  ngOnInit() {
    this.noteServ.subject$.subscribe((v) => ++this.notificationCount);
  }
}

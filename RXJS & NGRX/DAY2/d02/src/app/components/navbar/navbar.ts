import { Component, inject } from '@angular/core';
import { Notifications } from '../../services/notifiactions';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  notificationServ = inject(Notifications);
  notificationCount = 0;
  ngOnInit() {
    // this.notificationServ.notificationSubj$.next() ❌❌❌❌❌❌❌
    this.notificationServ.notificationObs$.subscribe({
      next: (v) => {
        console.log('navber', v);
        ++this.notificationCount;
      },
    });
  }
}

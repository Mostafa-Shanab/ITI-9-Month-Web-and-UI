import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  timer = 0;
  private intervalId?: number;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
    }
  }
}

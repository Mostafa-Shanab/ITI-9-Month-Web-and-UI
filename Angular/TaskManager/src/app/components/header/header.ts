import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  private router = inject(Router);
  private apiService = inject(ApiService);

  isLoggedIn = signal(this.apiService.isLoggedIn());

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isLoggedIn.set(this.apiService.isLoggedIn());
    });
  }

  logout(): void {
    this.apiService.logout();
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}

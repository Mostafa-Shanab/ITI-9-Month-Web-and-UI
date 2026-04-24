import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private router = inject(Router);
  private apiService = inject(ApiService);

  // Simple ngModel fields
  email = '';
  password = '';
  errorMessage = signal('');

  onLogin() {
    this.errorMessage.set('');

    this.apiService.login(this.email, this.password).subscribe({
      next: (users) => {
        if (users && users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          this.apiService.currentUser.set(users[0]); // Update signal for reactive UI
          this.router.navigate(['/home']);
        } else {
          this.errorMessage.set('Invalid email or password');
        }
      },
      error: () => {
        this.errorMessage.set('Login failed. Please try again.');
      },
    });
  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styles: ``,
})
export class Profile {
  route = inject(ActivatedRoute);
  router = inject(Router);
  id = '';
  // constructor()

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
  }

  // programmatic routing
  back() {
    this.router.navigate(['/home']);
  }
}

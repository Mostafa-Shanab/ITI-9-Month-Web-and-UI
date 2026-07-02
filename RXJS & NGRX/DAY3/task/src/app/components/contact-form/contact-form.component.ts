import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { addContact } from '../../store/actions';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  private store = inject(Store);

  name = '';
  email = '';
  phone = '';

  onSubmit() {
    if (this.name.trim() && this.email.trim() && this.phone.trim()) {
      this.store.dispatch(addContact({
        name: this.name.trim(),
        email: this.email.trim(),
        phone: this.phone.trim(),
      }));
      this.name = '';
      this.email = '';
      this.phone = '';
    }
  }
}

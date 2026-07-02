import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Contact } from '../../store/reducres';
import { selectContacts } from '../../store/selectors';

@Component({
  selector: 'app-contact-list',
  imports: [AsyncPipe],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent {
  private store = inject(Store);
  contacts$: Observable<Contact[]> = this.store.select(selectContacts);
}

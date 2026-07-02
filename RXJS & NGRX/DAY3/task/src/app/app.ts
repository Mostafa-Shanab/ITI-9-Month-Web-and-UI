import { Component } from '@angular/core';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'app-root',
  imports: [ContactListComponent, ContactFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

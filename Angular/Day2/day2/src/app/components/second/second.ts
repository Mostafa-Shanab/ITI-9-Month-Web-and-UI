import { Component } from '@angular/core';

@Component({
  selector: 'app-second',
  // inline component template
  templateUrl: './second.html',
  styleUrl: './second.css', // external style sheet
  // template: `<h1>this is inline template</h1>`,
})
export class Second {}

// encapsulation => style isoleated form other components

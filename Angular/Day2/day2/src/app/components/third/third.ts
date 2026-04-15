import { Component } from '@angular/core';

@Component({
  selector: 'app-third',
  imports: [],
  templateUrl: './third.html',
  styleUrl: './third.css',
  // styleUrls : []
  // inline style component
  styles: `
    h1 {
      background-color: greenyellow;
    }
  `, // higher piority
})
export class Third {}

// global style

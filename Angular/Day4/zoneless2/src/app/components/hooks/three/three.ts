import { Component } from '@angular/core';

@Component({
  selector: 'app-three',
  imports: [],
  templateUrl: './three.html',
  styles: `
    :host {
      display: block;
      background-color: yellowgreen;
    }
  `,
})
export class Three {
  get dis() {
    console.log('%cthree comp', 'color : yellow');
    return '';
  }
}

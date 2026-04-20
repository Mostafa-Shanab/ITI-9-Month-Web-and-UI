import { Component } from '@angular/core';
import { Three } from '../three/three';

@Component({
  selector: 'app-two',
  imports: [Three],
  templateUrl: './two.html',
  styles: `
    :host {
      display: block;
      padding: 10px;
      background-color: green;
    }
  `,
})
export class Two {
  get dis() {
    console.log('%ctwo comp', 'color : yellow');
    return '';
  }
}

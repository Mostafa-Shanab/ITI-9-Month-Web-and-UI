import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush, // onpush component
})
export class Two {
  // ngDoCheck(): void {
  //   console.log('%c3. Two Comp ngDoCheck', 'color : red');
  // }

  count = 0;
  get dis() {
    console.log('%ctwo comp', 'color : red');
    return '';
  }
}

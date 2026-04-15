import { Component, ViewEncapsulation } from '@angular/core';
import { First } from '../components/first/first';

@Component({
  selector: 'app-end',
  imports: [First],
  templateUrl: './end.html',
  styleUrl: './end.css',
  // encapsulation: ViewEncapsulation.None,
  // encapsulation: ViewEncapsulation.Emulated, // default
  // shadow dom
  encapsulation: ViewEncapsulation.ShadowDom, // default
})
export class End {}

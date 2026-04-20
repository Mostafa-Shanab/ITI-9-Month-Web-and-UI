import { Component, Input } from '@angular/core';
import { Product } from '../../types';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styles: ``,
})
export class Card {
  @Input() prod!: Product;
}
 
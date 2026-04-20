import { ChangeDetectionStrategy, Component, ContentChild, ElementRef } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush, // onpush component
})
export class Three {
  count = 0;
  @ContentChild('h1conteninparent') text!: ElementRef;

  // ngAfterContentInit() {
  //   // only once CD
  //   console.log('%c4. three Comp ngAfterContentInit', 'color : purple');
  //   console.log(this.text);
  //   this.text.nativeElement.style.color = 'green';
  // }
  // ngAfterContentChecked() {
  //   console.log('%c5. three Comp ngAfterContentChecked', 'color : purple');
  // }

  // ngAfterViewInit() {
  //   // only once CD
  //   console.log('%c6. three Comp ngAfterViewInit', 'color : purple');
  // }
  // ngAfterViewChecked() {
  //   console.log('%c7. three Comp ngAfterViewChecked', 'color : purple');
  // }
  get dis() {
    console.log('%cthree comp', 'color : green');
    return '';
  }
}

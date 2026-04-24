import { ContentChild, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCustom]',
})
export class Custom {
  @Input('dddddddddd') c: string = '';
  constructor(private ele: ElementRef) {
    console.log(ele);
    this.ele.nativeElement.style.color = 'red';
  }

  @HostListener('mouseover') mouseOverEle() {
    this.ele.nativeElement.style.color = 'green';
  }

  @HostListener('mouseout') mouseOutEle() {
    this.ele.nativeElement.style.color = this.c;
  }
}

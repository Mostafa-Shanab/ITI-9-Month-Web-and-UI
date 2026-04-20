import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-one',
  imports: [],
  templateUrl: './one.html',
  styles: `
    :host {
      display: block;
      background-color: brown;
    }
  `,
})
export class One {
  @Input() dataCount: number = 0;
  @Input() dataOne = { name: '' };

  childCount: number = 0;
  constructor(private cd: ChangeDetectorRef) {
    console.log('1. One Comp constructor');
    // console.log(this.dataOne);
    // this.dataOne.name = 'asdasdasd';
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('2. One Comp ngOnChanges');
  //   console.log(changes);
  //   // initial (first) change detection || depend => Input =-> change (ref change)
  // }

  // initial change detection (input exist in comp)
  // will keep running when input changes
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(this.dataObjInList);
  //   console.log(changes);
  //   if (changes['dataObjInList'].firstChange) return;
  //   this.dataInlist.push(this.dataObjInList);
  //   // console.log(this.dataInlist);
  //   // console.log('productList');
  // }

  ngOnInit(): void {
    // run once
    // class content initialized => @Input
    // best place to do async (tmier , call api)
    // console.log(this.dataOne);
    // console.log('%c3. One Comp ngOnInit', 'color : red');

    setInterval(() => {
      // this.cd.detectChanges();
      // this.cd.markForCheck();
      ++this.dataCount;
      console.log('object');
    }, 1000);
  }

  get dis() {
    console.log('%cone comp', 'color : yellow');
    return '';
  }
}

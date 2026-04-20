import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Three } from '../three/three';

@Component({
  selector: 'app-one',
  imports: [Three],
  templateUrl: './one.html',
  styles: `
    :host {
      display: block;
      background-color: brown;
      margin-bottom: 10px;
      padding: 10px;
    }
  `,
})
export class One implements DoCheck, OnDestroy {
  // @ViewChild or @ViewChildren => selfstudy
  @Input() dataCount: number = 0;
  @Input() dataOne = { name: '' };
  @Output() event = new EventEmitter();
  childCount: number = 0;

  inc() {
    this.event.emit(++this.childCount);
  }
  // zone = new NgZone();
  // dependancy injection
  constructor(private zone: NgZone) {
    console.log('1. One Comp constructor');
    // console.log(this.dataOne);
    // this.dataOne.name = 'asdasdasd';
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('2. One Comp ngOnChanges');
    console.log(changes);
    // initial (first) change detection || depend => Input =-> change (ref change)
  }

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
    console.log('%c3. One Comp ngOnInit', 'color : red');

    //  setInterval(() => {
    //    // ++this.dataCount;
    //    console.log('object');
    //  }, 1000);

    // this.zone.runOutsideAngular(() => {
    //   setInterval(() => {
    //     ++this.dataCount;
    //     //  console.log('object');
    //   }, 1000);
    // });
  }

  ngDoCheck(): void {
    console.log('%c4. One Comp ngDoCheck', 'color : white');
  }

  // ng-content
  ngAfterContentInit() {
    // only once CD
    console.log('%c4. One Comp ngAfterContentInit', 'color : white');
  }
  ngAfterContentChecked() {
    console.log('%c5. One Comp ngAfterContentChecked', 'color : white');
  }

  ngAfterViewInit() {
    // only once CD
    console.log('%c6. One Comp ngAfterViewInit', 'color : white');
  }
  ngAfterViewChecked() {
    console.log('%c7. One Comp ngAfterViewChecked', 'color : white');
  }

  ngOnDestroy(): void {
    console.log('c%one is dead', 'color : red');
  }

  get dis() {
    console.log('%cone comp', 'color : yellow');
    return '';
  }
}

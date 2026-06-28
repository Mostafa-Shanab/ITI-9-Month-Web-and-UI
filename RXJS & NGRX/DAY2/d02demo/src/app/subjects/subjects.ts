import { Component } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  imports: [],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css',
})
export class Subjects {
  // COLD & HOT OBSERVABLE
  // subject -> multicasting
  // subject -> observable & oberver
  // ngOnInit() {
  //   const obs$ = interval(1000); // Cold | Hot ?
  //   const subjec$ = new Subject();
  //   const behaviorSubject$ = new BehaviorSubject(0); // -> memory -> remeber last
  //   obs$.subscribe(behaviorSubject$);
  //   // obs$.subscribe({
  //   //   next: (v) => console.log('SUB 1 : ', v),
  //   // });
  //   behaviorSubject$.subscribe({
  //     next: (v) => console.log('SUB 1 : ', v),
  //   });
  //   setTimeout(() => {
  //     behaviorSubject$.subscribe({
  //       next: (v) => {
  //         console.log(">>>curr : " , behaviorSubject$.getValue());
  //         console.log('SUB 2 : ', v);
  //       },
  //     });
  //   }, 3000);
  // }
}

// import { HttpClient } from '@angular/common/http';
// import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
// import {
//   catchError,
//   concat,
//   concatMap,
//   debounceTime,
//   delay,
//   empty,
//   filter,
//   forkJoin,
//   fromEvent,
//   interval,
//   map,
//   merge,
//   mergeMap,
//   Observable,
//   of,
//   Subject,
//   switchMap,
//   tap,
// } from 'rxjs';
// import { Subjects } from "./subjects/subjects";

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.html',
//   styleUrl: './app.css',
//   imports: [Subjects],
// })
// export class App {
//   http = inject(HttpClient);
//   products = signal<any>([]);
//   loading = signal(false);
//   error = false;
// ngOnInit() {
// const obs1$ = of(5, 2, 8, 9, 6, 3, 5, 1, 4, 7); // this will be subscribed and after it finished
// const obs2$ = interval(1000); // the second obs2 will be subscribed and wait 1s to start emits values
// the reason is that (of) is sync to it emit immeditaly if we switch the order we will get the same senario
// const obs3$ = interval(3000);
// merge doesnt wait to the first observable to be completed it just emits a new notifications with whaterver observable emition
// on the other hand concat wait for the first observable to be completed and then start to subscribe to the second and so on
//   merge(obs2$, obs3$).subscribe({
//   next: (v) => {
//     console.log(v);
//   },
//   error: (err) => {
//     console.log(err);
//   },
//   complete: () => {
//     console.log('Completed!!!!!');
//   },
// });
// if we start with interval we will never gets a values form obs1 because the obs2 never completes
//   concat(obs2$, obs1$).subscribe({
//   next: (v) => {
//     console.log(v);
//   },
//   error: (err) => {
//     console.log(err);
//   },
//   complete: () => {
//     console.log('Completed!!!!!');
//   },
// });
/////////////////////////////////////////////
// pipeable operators
// all pipeable operators run inside pipe function
// this .pipe() is chained to the source observable to link operator to that source obs
// and returns new observable
// const obs1$ = new Observable((sub) => {
//   sub.next(1);
//   sub.next(2);sou
//   sub.next(3);
//   sub.next(4);
// });
// const pipedObs1$ = obs1$.pipe();
// console.log('pipedObs1 : ', pipedObs1$);
// so instead of changing the original source obs => we just pipe it that return a new updated one as we want
// we can pass the operators and argument to this pipe function
// what happen when we call pipe on observalbe underneath -> this pipe will subscribe to the source observable
// and the source will run starts it's logic and emits notifications
// everytime the source emits next notification it will reach the pipe's operators first before reaching to the obsrver obj to handle it
// and the operators will decide whether this notification will reach the observable or not
// it can also change the emited notification values it any way it wants
// we can stack operators in pipe funciton and each operator will return new observable and the next operators will subsctibe to the observable returned by the previous operator
// so we can use it transform notification before they reach to observer
// filter
// map
// tap
// debounceTime
// catchError
// flatting operators (higher order operators)
// concatMap , switchMap , mergeMap , exaustMap

// const obs1$ = new Observable<number>((sub) => {
//   sub.next(1);
//   sub.next(2);
//   sub.next(3);
//   sub.next(4);
// });
// const pipedObs1$ = obs1$.pipe(
//   map((v) => v * 10),
//   filter((v) => v < 30),
// );
// pipedObs1$.subscribe({
//   next: (v) => {
//     console.log(v);
//   },
//   error: (err) => {
//     console.log(err);
//   },
//   complete: () => {
//     console.log('Completed!!!');
//   },
// });
// const api1$ = this.http.get<any>('https://randomuser.me/api/').pipe(
//   // tap({
//   //   next: (v) => console.log('one : ', v),
//   // }),
//   map((v) => v.results[0].name.first + ' ' + v.results[0].name.last),
//   // tap({
//   //   next: (v) => console.log('ttwo : ', v),
//   // }),
// );
// const api2$ = this.http
//   .get<any>('https://randomuser.me/api/')
//   .pipe(map((v) => v.results[0].location.city));
// forkJoin([api1$, api2$])
//   .pipe(
//     tap({
//       subscribe: () => {
//         console.log('object');
//         this.loading.set(true);
//       },
//       // next: (v) => {
//       //   console.log(v);
//       //   this.loading.set(true);
//       // }, // this will not work because it completes with the next so there's no time to set loading true
//       complete: () => {
//         console.log('Completed!!');
//         this.loading.set(false);
//       },
//     }),
//   )
//   .subscribe(([a, b]) => {
//     console.log(a + ' from ' + b);
//   });
// }
// @ViewChild('input') inputEle!: ElementRef<HTMLInputElement>;
// ngAfterViewInit() {
//   let inputObs$ = fromEvent<InputEvent>(this.inputEle.nativeElement, 'input').pipe(
//     map((v) => {
//       return v.target as HTMLInputElement;
//     }),
//     debounceTime(1000), // it will for emit to satle down and wait 1s to emit last emission
//     // if new emission come before debounce finish 1s the value would be forgotten and debounce will start counting from begging
//   );

//   inputObs$.subscribe({
//     next: (v) => {
//       console.log(v.value);
//     },
//     complete: () => {
//       console.log('Completed!!');
//     },
//   });
// }

// ngOnInit() {
// const obs$ = new Observable<number>((sub) => {
//   let x = 0;
//   setInterval(() => {
//     sub.next(++x);
//   }, 1000);
//   let timer = setTimeout(() => {
//     sub.error(new Error('ERROR!!!!!!'));
//   }, 5000);
// })
//   // .pipe(catchError(() => of('THIS IS ERROR-_-')))
//   // .pipe(catchError(() => empty()))
//   .pipe(concatMap((v) => of(v * 10, v * 20, v * 30)))
//   .subscribe({
//     next: (v) => {
//       console.log(v);
//     },
//     error: (err) => {
//       console.error(err.message);
//     },
//     complete: () => {
//       console.log('Completed!!');
//     },
//   });
// }

// @ViewChild('input') inputEle!: ElementRef<HTMLInputElement>;
// @ViewChild('btn') btnEle!: ElementRef<HTMLButtonElement>;
// ngAfterViewInit() {
// let inputObs$ = fromEvent<InputEvent>(this.inputEle.nativeElement, 'input').pipe(
//   map((v) => {
//     return v.target as HTMLInputElement;
//   }),
//   debounceTime(1000), // it will for emit to satle down and wait 1s to emit last emission
//   // if new emission come before debounce finish 1s the value would be forgotten and debounce will start counting from begging
//   concatMap((slug) =>
//     this.http.get<any>(`https://api.escuelajs.co/api/v1/categories/slug/${slug.value}`).pipe(
//       map((v) => v.name),
//       catchError(() => empty()),
//     ),
//   ),
// );
// inputObs$.subscribe({
//   next: (v) => {
//     console.log(v);
//   },
//   complete: () => {
//     console.log('Completed!!');
//   },
// });
// let btnObs$ = fromEvent<InputEvent>(this.btnEle.nativeElement, 'click').pipe(
//   // tap({
//   //   next: () => {
//   //     console.log('object');
//   //   },
//   // }),
//   map(() => this.inputEle.nativeElement.value),
//   // concatMap((slug) => {
//   //   console.log('Starting:', slug);
//   //   return this.http.get<any>(`https://api.escuelajs.co/api/v1/categories/slug/${slug}`).pipe(
//   //     tap(() => console.log('Finished:', slug)),
//   //     map((v) => v.name),
//   //     catchError(() => empty()),
//   //   );
//   // }),
//   // switchMap((slug) => {
//   //   console.log('Starting:', slug);
//   //   return this.http.get<any>(`https://api.escuelajs.co/api/v1/categories/slug/${slug}`).pipe(
//   //     tap(() => console.log('Finished:', slug)),
//   //     map((v) => v.name),
//   //     catchError(() => empty()),
//   //   );
//   // }),
//   mergeMap((slug) => {
//     console.log('Starting:', slug);
//     return this.http.get<any>(`https://api.escuelajs.co/api/v1/categories/slug/${slug}`).pipe(
//       tap(() => console.log('Finished:', slug)),

//       map((v) => v.name),
//       catchError(() => empty()),
//     );
//   }),
// );

// btnObs$.subscribe({
//   next: (v) => {
//     console.log(v);
//   },
//   complete: () => {
//     console.log('Completed!!');
//   },
// });
//   }
// }

import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Sender } from './components/sender/sender';
import { Toast } from './components/toast/toast';
import { History } from './components/history/history';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Navbar, Sender, Toast, History],
})
export class App {
  swtichDis: boolean = true;
  switch() {
    this.swtichDis = !this.swtichDis;
  }
}

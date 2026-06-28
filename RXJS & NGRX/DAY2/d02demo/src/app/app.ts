// import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
// import { Navbar } from './components/navbar/navbar';
// import { Sender } from './components/sender/sender';
// import { Toast } from './components/toast/toast';
// import { History } from './components/history/history';
// import {
//   catchError,
//   concat,
//   concatMap,
//   debounceTime,
//   distinctUntilChanged,
//   empty,
//   exhaustMap,
//   filter,
//   flatMap,
//   fromEvent,
//   interval,
//   map,
//   merge,
//   mergeMap,
//   Observable,
//   of,
//   switchMap,
//   take,
//   tap,
//   timer,
// } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { Subjects } from "./subjects/subjects";

import { Component } from '@angular/core';
import { Subjects } from './subjects/subjects';
import { Navbar } from './components/navbar/navbar';
import { Sender } from './components/sender/sender';
import { Toast } from './components/toast/toast';
import { History } from './components/history/history';

// @Component({
//   selector: 'app-root',
//   // imports: [Navbar, Sender, Toast, History],
//   templateUrl: './app.html',
//   styleUrl: './app.css',
//   imports: [Subjects],
// })
// export class App {
//   // http = inject(HttpClient);
//   // load = signal<boolean>(false);
//   // error = signal<{
//   //   message: string;
//   //   state: boolean;
//   // }>({
//   //   message: '',
//   //   state: false,
//   // });
//   // data: any = signal<any | null>(null);
//   // ngOnInit() {
//   // concat
//   // let timer$ = timer(1000 , 1000); // setTimeout  || setInterval with delay
//   // let interval$ = interval(1000);
//   // observer obj -> handlers <- observable
//   // interval$.subscribe({
//   //   next: (v) => {
//   //     console.log(v);
//   //   },
//   //   error: (err) => {
//   //     console.log(err);
//   //   },
//   //   complete: () => {
//   //     console.log('Complete!!');
//   //   },
//   // }); // create subscription
//   // console.log('ONE ');
//   // let of$ = of('A', 'B', 'C');
//   // .subscribe({
//   //   next: (v) => {
//   //     console.log(v);
//   //   },
//   //   error: (err) => {
//   //     console.log(err);
//   //   },
//   //   complete: () => {
//   //     console.log('Complete!!');
//   //   },
//   // });
//   // console.log('TWO');
//   // let concat$ = concat(of$, interval$); // return obs.sub
//   // [[1,2,3] , [5,6,4,6]]
//   // 1 , 2 , 3 , 4 , "A" , "B" , "C"
//   // inifinte observable
//   // concat$.subscribe({
//   //   next: (v) => {
//   //     console.log(v);
//   //   },
//   //   error: (err) => {
//   //     console.log(err);
//   //   },
//   //   complete: () => {
//   //     console.log('Complete!!');
//   //   },
//   // });
//   // merge
//   // let timer$ = timer(3000, 2000);
//   // let merge$ = merge(timer$, interval$).subscribe({
//   //   next: (v) => {
//   //     console.log(v);
//   //   },
//   //   error: (err) => {
//   //     console.log(err);
//   //   },
//   //   complete: () => {
//   //     console.log('Complete!!');
//   //   },
//   // });
//   //pipeable opertors -> functions -> transform - filter - combine -> emitted data
//   // called as arguments inside function -> pipe(oper1() , oper2())
//   // .pipe() chained (source observable)
//   // link -> operators <-> source observable
//   // filter
//   // map
//   // take
//   // let interval$ = interval(200);
//   // // interval$.subscribe((v) => console.log('interval : ', v));
//   // let pipedInterval$ = interval$.pipe(
//   //   take(6), // 0 , 1 , 2 , 3 , 4 , 5  -> obs
//   //   filter((v) => v % 2 === 0), // 2 , 4
//   //   map((v) => v * 2),
//   //   map(() => 'hamada'),
//   // ); // return new observable.subscribe
//   // pipedInterval$.subscribe({
//   //   next: (v) => console.log('pipedInterval : ', v),
//   //   error: (err) => {
//   //     console.log(err);
//   //   },
//   //   complete: () => console.log('Completed!!!!'),
//   // });
//   // tap
//   // debounceTime - (distincitUntilChanged -> selfStudey)
//   // catchError

//   // const api1$ = this.http.get<any>('https://randomuser.me/ap/');
//   // api1$
//   //   .pipe(
//   //     map((v) => v.results[0].name.first), // => obs
//   //     tap({
//   //       subscribe: () => {
//   //         // console.log('subscribe');
//   //         this.load.set(true);
//   //       },
//   //       next: (v) => {
//   //         // this.load.set(true);
//   //         console.log('TAP 2 : ', v);
//   //         // console.log('>>>>> ', this.load());
//   //       }, //
//   //       error: (err) => {
//   //         console.error('!!!!!!!!!ERROR : ', err.message);
//   //         this.error.set({
//   //           state : true,
//   //           message : "ERORORORORORORORORORO"
//   //         })
//   //       },
//   //       complete: () => {
//   //         // this.load.set(false);
//   //         console.log('>>>>TAP 2 Completed');
//   //       },

//   //       unsubscribe: () => {
//   //         console.log('unsubscribe');
//   //       },
//   //       finalize: () => {
//   //         this.load.set(false);
//   //         console.log('finalize');
//   //       },
//   //     }),
//   //   )
//   //   .subscribe({
//   //     next: (v) => {
//   //       console.log(v);
//   //       // this.data = v.results[0].name.first;
//   //       // this.data.set(v.results[0].name.first);
//   //       this.data.set(v);
//   //     },
//   //     error: (err) => {
//   //       console.log(err);
//   //     },
//   //     complete: () => {
//   //       console.log('Complete!!');
//   //     },
//   //   });
//   // }

//   http = inject(HttpClient);
//   load = signal<boolean>(false);
//   error = signal<{
//     message: string;
//     state: boolean;
//   }>({
//     message: '',
//     state: false,
//   });
//   data: any = signal<any | null>(null);

//   // debounceTime - (distincitUntilChanged -> selfStudey)

//   // @ViewChild('inputRef') input!: ElementRef<HTMLInputElement>;
//   // ngAfterViewInit() {
//   //   let input$ = fromEvent(this.input.nativeElement, 'input')
//   //     .pipe(
//   //       map((v) => {
//   //         // let i = v.target as HTMLInputElement;
//   //         // return i.value
//   //         // return i;
//   //         return this.input.nativeElement.value;
//   //       }),
//   //       debounceTime(3000),
//   //       // distinctUntilChanged(),
//   //       tap((v) => console.log(v)),
//   //     )
//   //     .subscribe({
//   //       next: (v) => {
//   //         console.log(v);
//   //       },
//   //       error: (err) => {
//   //         console.log('>>>ERROR! : ', err.message);
//   //       },
//   //       complete: () => {
//   //         console.log('Completed!!!!');
//   //       },
//   //     });
//   // }

//   // catchError

//   obs$ = new Observable<number>((sub) => {
//     let x = 0;
//     let i = setInterval(() => {
//       sub.next(++x);
//     }, 1000);

//     // let o = setTimeout(() => {
//     //   sub.error(new Error('This is ERROR'));
//     // }, 3000);

//     return () => {
//       clearInterval(i);
//       // clearTimeout(o);
//     };
//   });

//   // // run side effect -> catchError operator -> return observable -> subscribe to side effect obs -> emit

//   // ngOnInit() {
//   //   this.obs$
//   //     .pipe(
//   //       catchError((v) => {
//   //         console.log('catchError');
//   //         // return of('IM ERROR FROM CATCHERROR');
//   //         // return new Observable((sub)=>{
//   //         //   sub.error(new Error("FROM CATCHERRRO!!"))
//   //         // });

//   //         // return empty();
//   //         return new Observable((sub) => {
//   //           sub.complete();
//   //         });
//   //       }),
//   //       // map((v)=>{
//   //       //   return v + " " + "THROUGH MAP"
//   //       // })
//   //     )
//   //     .subscribe({
//   //       next: (v) => {
//   //         console.log(v);
//   //       },
//   //       error: (err) => {
//   //         console.log('>>>ERROR! : ', err.message);
//   //       },
//   //       complete: () => {
//   //         console.log('Completed!!!!');
//   //       },
//   //     }); // error notification -> complete notficatoin (conver error to complete)
//   // }

//   // flatting operators -> like catchError
//   // next notfifcation
//   // concatMap -> safest
//   // ngOnInit() {
//   //   this.obs$
//   //     .pipe(
//   //       // tap((v) => console.log('before concat : ', v)),
//   //       // concatMap((v) => of(v * 10, v * 20, v * 30)), // next(1) -> new inner sub -> (10 , 20 , 30 ,complete) , ()
//   //       // switchMap((v) => of(v * 10, v * 20, v * 30)), // next(1) -> new inner sub -> (10 , 20 , 30 ,complete) , ()
//   //       // mergeMap((v) => of(v * 10, v * 20, v * 30))s, // next(1) -> new inner sub -> (10 , 20 , 30 ,complete) , ()
//   //       // tap((v) => console.log('after concat : ', v)),
//   //     )
//   //     .subscribe({
//   //       next: (v) => {
//   //         console.log(v);
//   //       },
//   //       error: (err) => {
//   //         console.log('>>>ERROR! : ', err.message);
//   //       },
//   //       complete: () => {
//   //         console.log('Completed!!!!');
//   //       },
//   //     });
//   // }

//   @ViewChild('inputRef') input!: ElementRef<HTMLInputElement>;
//   @ViewChild('btnRef') btn!: ElementRef<HTMLButtonElement>;

//   ngAfterViewInit() {
//     // this.http.get(`https://dummyjson.com/users/search?q=${name}`); //  => obs.subscribe
//     // let input$ = fromEvent(this.input.nativeElement, 'input')
//     let btn$ = fromEvent(this.btn.nativeElement, 'click')
//       .pipe(
//         map((v) => {
//           return this.input.nativeElement.value;
//         }),
//         // debounceTime(3000),
//         // distinctUntilChanged(),
//         // concatMap((name) => {
//         //   console.log('Starting:', name);
//         //   return this.http
//         //     .get<any>(`https://dummyjson.com/users/search?q=${name}`)
//         //     .pipe(tap(() => console.log('Finished:', name)));
//         // }),
//         // switchMap((name) => {
//         //   console.log('Starting:', name);
//         //   return this.http
//         //     .get<any>(`https://dummyjson.com/users/search?q=${name}`)
//         //     .pipe(tap(() => console.log('Finished:', name)));
//         // }),
//         exhaustMap((name) => {
//           console.log('Starting:', name);
//           return this.http
//             .get<any>(`https://dummyjson.com/users/search?q=${name}`)
//             .pipe(tap(() => console.log('Finished:', name)));
//         }),
//         // mergeMap((name) => {
//         //   console.log('Starting:', name);
//         //   return this.http
//         //     .get<any>(`https://dummyjson.com/users/search?q=${name}`)
//         //     .pipe(tap(() => console.log('Finished:', name)));
//         // }),
//         // debounceTime(3000),
//         // distinctUntilChanged(),
//         // switchMap((name) => this.http.get<any>(`https://dummyjson.com/users/search?q=${name}`)),
//         // mergeMap((name) => this.http.get<any>(`https://dummyjson.com/users/search?q=${name}`)),
//         // tap((v) => console.log('TAP : ', v)),
//         map((v) => {
//           return v.users.map((u: any) => u.firstName);
//         }),
//       )
//       .subscribe({
//         next: (v) => {
//           console.log(v);
//         },
//         error: (err) => {
//           console.log('>>>ERROR! : ', err.message);
//         },
//         complete: () => {
//           console.log('Completed!!!!');
//         },
//       });
//   }

//   // switchMap
//   // mergeMap
//   // exhaustMap -> selfStudy
// }

@Component({
  selector: 'app-root',
  imports: [Navbar, Sender, Toast, History],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // imports: [Subjects],
})
export class App {
  switchDis = true;

  switch() {
    this.switchDis = !this.switchDis;
  }
}

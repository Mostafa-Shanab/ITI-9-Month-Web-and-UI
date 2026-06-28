import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-subjects',
  imports: [],
  templateUrl: './subjects.html',
  styles: ``,
})
export class Subjects {
  // cold observables -> unicast -> each new subscripition create a new instance of the data
  // hot observables -> multicast -> every subscriber gets the same data at this point of time
  //                                                        it's like multiple obervers listening for changnes
  //                                                        observable will keep working until all subscriber unsubscribe
  // reqular obsefvables are cold and unicasting
  // subject
  // subject$ = new Subject<number>();

  // numbers$ = new Observable<number>((subscriber) => {
  //   let count = 0;

  //   setInterval(() => {
  //     subscriber.next(++count);
  //   }, 1000);
  // });

  // ngOnInit() {
  //   // Observable sends its values into the Subject
  //   this.numbers$.subscribe(this.subject$);

  //   // First subscriber
  //   this.subject$.subscribe((value) => {
  //     console.log('Subscriber 1:', value);
  //   });

  //   // Second subscriber joins after 4 seconds
  //   setTimeout(() => {
  //     this.subject$.subscribe((value) => {
  //       console.log('Subscriber 2:', value);
  //     });
  //   }, 4000);
  // }

  // behaviorSubject

  // behaviorSubject$ = new BehaviorSubject<number>(0);

  // numbers$ = new Observable<number>((subscriber) => {
  //   let count = 0;

  //   setInterval(() => {
  //     subscriber.next(++count);
  //   }, 1000);
  // });

  // ngOnInit() {
  //   // Observable sends its values into the BehaviorSubject
  //   this.numbers$.subscribe(this.behaviorSubject$);

  //   // First subscriber
  //   this.behaviorSubject$.subscribe((value) => {
  //     console.log('Subscriber 1:', value);
  //     console.log('behaviorSubject 1:', this.behaviorSubject$.value);
  //   });

  //   // Second subscriber joins after 4 seconds
  //   setTimeout(() => {
  //     this.behaviorSubject$.subscribe((value) => {
  //       console.log('Subscriber 2:', value);
  //       console.log('behaviorSubject 2:', this.behaviorSubject$.getValue());
  //     });
  //   }, 4000);
  // }

  // isLoggedIn$ = new Subject<boolean>();
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  @ViewChild('login') login!: ElementRef<HTMLElement>;
  @ViewChild('logout') logout!: ElementRef<HTMLElement>;
  @ViewChild('data') data!: ElementRef<HTMLElement>;
  @ViewChild('print') print!: ElementRef<HTMLElement>;
  ngAfterViewInit() {
    // this.login.nativeElement.addEventListener('click', () => {
    //   this.data.nativeElement.innerHTML = 'value.toString()';
    // });
    const loginEvent$ = fromEvent(this.login.nativeElement, 'click').subscribe(() => {
      this.isLoggedIn$.next(true);
    });
    const logoutEvent$ = fromEvent(this.logout.nativeElement, 'click').subscribe(() => {
      this.isLoggedIn$.next(false);
    });

    this.isLoggedIn$.subscribe((value) => {
      console.log(value);
      this.data.nativeElement.innerHTML = value.toString();
      this.login.nativeElement.style.display = value ? 'none' : 'block';
      this.logout.nativeElement.style.display = !value ? 'none' : 'block';
    });
    fromEvent(this.print.nativeElement, 'click').pipe(withLatestFrom(this.isLoggedIn$)).subscribe((v) => {
      console.log(this.isLoggedIn$.value);
      console.log(v);
    });
  }
}

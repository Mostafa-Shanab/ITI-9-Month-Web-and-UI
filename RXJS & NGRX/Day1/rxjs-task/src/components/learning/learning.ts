import { Component, ViewChild, ElementRef, AfterViewInit, signal } from '@angular/core';

import { fromEvent, interval, merge, Observable, of } from 'rxjs';

@Component({
  selector: 'app-learning',

  templateUrl: './learning.html',
})
export class Learning implements AfterViewInit {
  @ViewChild('login')
  login!: ElementRef;

  @ViewChild('logout')
  logout!: ElementRef;

  @ViewChild('enroll')
  enroll!: ElementRef;

  activities = signal<string[]>([]);

  ngAfterViewInit() {
    // const cold$ = new Observable((observer) => {
    //   observer.next(Math.random());
    // });
    // cold$.subscribe((value) => {
    //   console.log('Cold Subscriber 1:', value);
    // });
    // cold$.subscribe((value) => {
    //   console.log('Cold Subscriber 2:', value);
    // });

    // const hot$ = interval(1000);
    // hot$.subscribe((value) => {
    //   console.log('Hot Subscriber 1:', value);
    // });
    // setTimeout(() => {
    //   hot$.subscribe((value) => {
    //     console.log('Hot Subscriber 2:', value);
    //   });
    // }, 5000);

    const login$ = fromEvent(this.login.nativeElement, 'click');
    const logout$ = fromEvent(this.logout.nativeElement, 'click');
    const enroll$ = fromEvent(this.enroll.nativeElement, 'click');

    merge(login$, logout$, enroll$).subscribe({
      next: (event: any) => {
        this.activities.update((old) => [...old, event.target.innerText]);
      },
    });

    login$.subscribe(() => {
      this.startOnboarding();
    });
  }

  startOnboarding() {
    const workflow$ = of('Create Profile', 'Choose Course', 'Start Learning');

    workflow$.subscribe({
      next: (step) => {
        this.activities.update((old) => [...old, step]);
      },
      complete() {
        console.log('Workflow completed');
      },
    });
  }
}

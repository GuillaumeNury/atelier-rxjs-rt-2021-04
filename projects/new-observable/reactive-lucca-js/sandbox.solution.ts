import { Observable } from "./observable.solution";
import { Subject } from "./subject.solution";
import { ReplaySubject } from "./replaySubject.solution";

/**********************************************
 *             Part 1: OBSERVABLE             *
 **********************************************/

const range = (max: number) => new Observable<number>(
  observer => {
    if (max >= 10) {
      observer.error('Damn to high!')
      return;
    }

    for (let n = 0; n <= max; n++) {
      observer.next(n)
    }

    observer.complete();
  }
);

range(5).subscribe({
  next: n => console.log('Sub1: ' + n),
  error: err => console.log('Sub1: ' + err),
  complete: () => console.log('Sub1: complete'),
});
range(10).subscribe({
  next: n => console.log('Sub2: ' + n),
  error: err => console.log('Sub2: ' + err),
  complete: () => console.log('Sub2: complete'),
});





















/***********************************************
 *               Part 2: SUBJECT               *
 ***********************************************/

const state$ = new Subject<number>();

state$.next(1);
state$.next(2);

state$.subscribe({
  next: n => console.log('Sub1: ' + n),
  error: err => console.log('Sub1: ' + err),
  complete: () => console.log('Sub1: complete'),
});

state$.next(3);

state$.subscribe({
  next: n => console.log('Sub2: ' + n),
  error: err => console.log('Sub2: ' + err),
  complete: () => console.log('Sub2: complete'),
});

state$.next(4);
state$.next(5);
state$.complete();






















/**********************************************
 *           Part 3: REPLAY SUBJECT           *
 **********************************************/

const replayedState$ = new ReplaySubject<number>();
replayedState$.next(1);
replayedState$.next(2);

replayedState$.subscribe({
  next: n => console.log('Sub1: ' + n),
  error: err => console.log('Sub1: ' + err),
  complete: () => console.log('Sub1: complete'),
});

replayedState$.next(3);

replayedState$.subscribe({
  next: n => console.log('Sub2: ' + n),
  error: err => console.log('Sub2: ' + err),
  complete: () => console.log('Sub2: complete'),
});

replayedState$.next(4);
replayedState$.next(5);
replayedState$.complete();
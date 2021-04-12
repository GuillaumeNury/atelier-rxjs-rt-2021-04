import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { tap } from "rxjs/operators";

export function rxDebug<T>(name: string): MonoTypeOperatorFunction<T> {
  return source$ => {
    console.log(`${name}:executed`);
    let subscriber = 0;
    return new Observable<T>(observer => {
      let subscriberId = ++subscriber;
      console.log(`${name}:${subscriberId}:subscribe`);
      const sub = source$
        .pipe(
          tap({
            next: val => console.log(`${name}:${subscriberId}:next`, val),
            error: err => console.log(`${name}:${subscriberId}:error`, err),
            complete: () => console.log(`${name}:${subscriberId}:complete`),
          })
        )
        .subscribe(observer);

      return () => {
        console.log(`${name}:${subscriberId}:unsubscribe`);
        sub.unsubscribe();
      }
    });
  }
}

export function onSubscribe<T>(name: string): MonoTypeOperatorFunction<T> {
  return source$ => new Observable<T>(observer => {
    console.log(`${name}:subscribe`);
    return source$.subscribe(observer);
  });
}

export function onUnsubscribe<T>(name: string): MonoTypeOperatorFunction<T> {
  return source$ => new Observable<T>(observer => {
    const sub = source$.subscribe(observer);

    return () => {
      console.log(`${name}:unsubscribe`);
      sub.unsubscribe();
    };
  });
}
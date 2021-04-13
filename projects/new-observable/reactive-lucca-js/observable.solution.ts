export interface Observer<T> {
  next: (val: T) => unknown;
  error: (err: unknown) => unknown;
  complete: () => unknown;
}

export class Observable<T> {
  public subscribe: (observer: Observer<T>) => unknown;

  constructor(subscribe: (observer: Observer<T>) => unknown) {
    this.subscribe = subscribe;
  }
}

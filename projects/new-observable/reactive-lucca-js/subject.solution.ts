import { Observable, Observer } from "./observable.solution";

export class Subject<T> extends Observable<T> {
  private _observers: Observer<T>[];

  public constructor() {
    super(observer => { this._observers.push(observer); });

    this._observers = [];
  }

  public next(value: T): void {
    for (const observer of this._observers) {
      observer.next(value);
    }
  }

  public error(err: unknown): void {
    for (const observer of this._observers) {
      observer.error(err);
    }
  }

  public complete(): void {
    for (const observer of this._observers) {
      observer.complete();
    }
  }
}

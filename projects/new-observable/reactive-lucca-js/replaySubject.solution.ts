import { Observable, Observer } from "./observable.solution";
import { Subject } from "./subject.solution";

export class ReplaySubject<T> extends Subject<T> {
  private _emittedValues: T[];
  private _originalSubscribe: Observable<T>['subscribe'];

  constructor() {
    super();

    this._emittedValues = [];
    this._originalSubscribe = this.subscribe;
    this.subscribe = this._subscribe;
  }

  public next(value: T): void {
    this._emittedValues.push(value);
    super.next(value);
  }

  private _subscribe(observer: Observer<T>): void {
    for (const value of this._emittedValues) {
      observer.next(value);
    }

    this._originalSubscribe(observer);
  }
}

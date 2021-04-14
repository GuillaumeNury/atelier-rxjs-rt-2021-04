import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class Store {
  count$: Observable<number>;
  _count$: BehaviorSubject<number>;

  constructor() {
    this._count$ = new BehaviorSubject(1);
    this.count$ = this._count$.asObservable();
  }

  increment() {
    this._count$.next(this._count$.value + 1);
  }

  reset() {
    this._count$.next(1);
  }
}
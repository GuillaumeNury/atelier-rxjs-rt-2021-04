import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-case1',
  template: `
    <div class="card fluid">
      <div class="section">
        <h1>
          <span class="icon-bookmark"></span>
          {{ title$ | async }}
        </h1>
      </div>
      <div class="section">
        <h3>
          <span class="icon-settings"></span>
          Output
        </h3>
        <p>
          Length: {{ twiceTitleLength$ | async }} / 2 = {{ titleLength$ | async }} chars
        </p>
        <button (click)="appendTextToTitle()">Add 🚀</button>
      </div>
      <div class="section">
        <h3>
          <span class="icon-help"></span>
          Questions
        </h3>
        <ul>
          <li>
            Combien de souscriptions pour <code>title$</code> ?
          </li>
          <li>
            Combien de souscriptions pour <code>titleLength$</code> ?
          </li>
          <li>
            Combien de souscriptions pour <code>twiceTitleLength$</code> ?
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class Case1Component {
  title$: Observable<string>;
  titleLength$: Observable<number>;
  twiceTitleLength$: Observable<number>;

  _title$: BehaviorSubject<string>;

  constructor() {
    this._title$ = new BehaviorSubject('count-subscription-case1');
    this.title$ = this._title$.asObservable();

    this.titleLength$ = this.title$.pipe(map(title => title.length));
    this.twiceTitleLength$ = this.titleLength$.pipe(map(titleLength => titleLength * 2));
  }

  appendTextToTitle() {
    this._title$.next(this._title$.value + '🚀');
  }
}

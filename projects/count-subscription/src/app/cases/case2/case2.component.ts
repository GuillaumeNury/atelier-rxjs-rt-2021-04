import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-case2',
  template: `
    <div class="card fluid">
      <div class="section">
        <h1>
          <span class="icon-bookmark"></span>
          {{ originalTitle$ | async }}
        </h1>
      </div>
      <div class="section">
        <h3>
          <span class="icon-settings"></span>
          Output
        </h3>
        <p>
          Title: {{ title$ | async }}
        </p>
        <p>
          Length: {{ twiceTitleLength$ | async }} / 2 = {{ titleLength$ | async }} chars
        </p>
        <button (click)="updateSuffix()">Add 🚀</button>
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
            Combien de souscriptions pour <code>originalTitle$</code> ?
          </li>
          <li>
            Combien de souscriptions pour <code>titleLength$</code> ?
          </li>
          <li>
            Combien de souscriptions pour <code>twiceTitleLength$</code> ?
          </li>
          <li>
            Que se passe-t'il au clic sur le bouton ?
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class Case2Component {
  title$: Observable<string>;
  originalTitle$: Observable<string>;
  titleLength$: Observable<number>;
  twiceTitleLength$: Observable<number>;

  _originalTitle$: BehaviorSubject<string>;
  _suffix$: BehaviorSubject<string>;

  constructor() {
    this._originalTitle$ = new BehaviorSubject('count-subscription-case2');
    this._suffix$ = new BehaviorSubject('🚀');

    this.originalTitle$ = this._originalTitle$.asObservable();

    this.title$ = this._suffix$.pipe(
      switchMap(suffix => this.originalTitle$.pipe(map(originalTitle => originalTitle + suffix)))
    );

    this.titleLength$ = this.title$.pipe(map(title => title.length));
    this.twiceTitleLength$ = this.titleLength$.pipe(map(titleLength => titleLength * 2));
  }

  updateSuffix() {
    this._suffix$.next(this._suffix$.value + '🚀');
  }

}

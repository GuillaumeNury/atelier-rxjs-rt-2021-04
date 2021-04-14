import { Component } from '@angular/core';
import { Store } from './store';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header>
        <span class="logo">Atelier RT - Cas d'étude D</span>
        <a class="button" [routerLink]="'1'">Users</a>
        <a class="button" [routerLink]="'2'">Albums</a>
      </header>
  
      <div class="card fluid">
        <div class="section">
          <h1>
            Page : {{ store.count$ | async }}
          </h1>
        </div>

        <router-outlet></router-outlet>

        <div class="section">
          <button (click)="store.reset()">Reset</button>
          <button (click)="store.increment()">+</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  public constructor(public store: Store) { }
}

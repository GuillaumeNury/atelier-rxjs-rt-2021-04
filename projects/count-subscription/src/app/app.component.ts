import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <nav>
        <a [routerLink]="'case-1'">Cas 1</a>
        <a [routerLink]="'case-2'">Cas 2</a>
        <a [routerLink]="'case-3'">Cas 3</a>
      </nav>
  
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent { }

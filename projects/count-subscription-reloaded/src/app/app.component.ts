import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header>
        <span class="logo">Atelier RT - Comptage de souscriptions</span>
        <a class="button" [routerLink]="'case-1'">Cas 1</a>
        <a class="button" [routerLink]="'case-2'">Cas 2</a>
      </header>
  
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent { }

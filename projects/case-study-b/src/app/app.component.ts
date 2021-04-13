import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IAlbum } from './models';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="card fluid">
        <div class="section">
          <h1>
            <span class="icon-bookmark"></span>
            Albums
          </h1>
        </div>
        <div class="section">
          <input type="text" placeholder="Recherche..." [ngModel]="search$ | async" (ngModelChange)="setSearch($event)" >
        </div>
        <div class="section">
          <div class="row">
            <div class="card" *ngFor="let album of albums$ | async">
              {{album.title}}
            </div>
          </div>
        </div>
        <div class="section" style="text-align: center">
          <span>Page {{ page$ | async }}</span>
          <div>
            <button class="primary" (click)="prevPage()" [disabled]="(page$ | async) === 1">Prev</button>
            <button class="primary" (click)="nextPage()">Next</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  albums$: Observable<IAlbum[]>;

  search$: BehaviorSubject<string>;
  page$: BehaviorSubject<number>;

  public constructor(
    private httpClient: HttpClient
  ) {
    this.search$ = new BehaviorSubject('');
    this.page$ = new BehaviorSubject(1);
  }

  public ngOnInit(): void {
    this.albums$ = combineLatest([this.search$, this.page$])
      .pipe(
        switchMap(([search, page]) => this.getAlbums(page, search))
      );
  }

  public nextPage() {
    this.page$.next(this.page$.value + 1);
  }

  public prevPage() {
    this.page$.next(this.page$.value - 1);
  }

  public setSearch(search: string) {
    this.search$.next(search);

    if (this.page$.value > 1) {
      this.page$.next(1);
    }
  }

  private getAlbums(page: number, search: string): Observable<IAlbum[]> {
    const params = {
      _limit: '5',
      _page: page.toString(),
      q: search
    };

    return this.httpClient.get<IAlbum[]>(
      'https://jsonplaceholder.typicode.com/albums',
      { params },
    );
  }
}

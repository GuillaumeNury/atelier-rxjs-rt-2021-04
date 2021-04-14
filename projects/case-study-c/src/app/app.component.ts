import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IAlbum } from './models';
import { Store } from './store';

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
              <button (click)="toggle(album)">Toggle</button>
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
        <div class="section" style="text-align: center">
          <button class="primary" (click)="onCountClick()">Count</button>
        </div>
        <div class="section">
          <app-selected-album *ngFor="let album of selectedAlbums$ | async" [albumId]="album.id"></app-selected-album>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  albums$: Observable<IAlbum[]>;
  selectedAlbums$: Observable<IAlbum[]>;

  search$: Observable<string>;
  page$: Observable<number>;

  public constructor(
    private store: Store,
    private httpClient: HttpClient,
  ) {
    this.albums$ = store.albums$;
    this.selectedAlbums$ = store.selectedAlbums$;
    this.search$ = store.query$.pipe(map(q => q.search));
    this.page$ = store.query$.pipe(map(q => q.page));
  }

  public ngOnInit(): void {
    this.store.query$
      .pipe(
        switchMap(({ search, page }) => this.getAlbums(page, search))
      )
      .subscribe(albums => this.store.setAlbums(albums))
  }

  public onCountClick() {
    this.albums$.subscribe(
      albums => alert(`Il y a ${albums.length} albums affiché(s).`)
    );
  }

  public toggle(album: IAlbum) {
    this.store.toggleAlbum(album);
  }

  public nextPage() {
    this.store.nextPage();
  }

  public prevPage() {
    this.store.prevPage();
  }

  public setSearch(search: string) {
    this.store.setSearch(search);
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

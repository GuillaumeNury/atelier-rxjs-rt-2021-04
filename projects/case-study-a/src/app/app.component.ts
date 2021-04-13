import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
          <div class="row">
            <div class="card" *ngFor="let album of albums$ | async">
              {{album.title}}
            </div>
          </div>
        </div>
        <div class="section">
          <h3>
            <span class="icon-user"></span>
            Statistiques
          </h3>
        </div>
        <div class="section">
          <ul>
            <li *ngFor="let stat of albumsByUserId$ | async">
              <span>User {{ stat.userId }}</span> -
              <span>{{ stat.count }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  albums$: Observable<IAlbum[]>;
  albumsByUserId$: Observable<{ userId: number; count: number }[]>;

  public constructor(
    private httpClient: HttpClient
  ) {}

  public ngOnInit(): void {
    this.albums$ = this.getAlbums();

    this.albumsByUserId$ = this.albums$
      .pipe(
        map(albums => albums
          .reduce<Record<number, number>>(
            (acc, album) => ({ ...acc, [album.userId]: (acc[album.userId] ?? 0) + 1 }),
            {}
          )
        ),
        map(albumsByUserId => Object.entries(albumsByUserId)
          .map(([key, value]) => ({ userId: +key, count: value }))
          .sort((a, b) => b.count - a.count)
        )
      )
  }

  private getAlbums(): Observable<IAlbum[]> {
    const albumIds = ['1', '2', '3', '20', '21', '30'];
    const params = {
      _limit: '5',
      id: albumIds
    };

    return this.httpClient.get<IAlbum[]>(
      'https://jsonplaceholder.typicode.com/albums',
      { params },
    );
  }
}

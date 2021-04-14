import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '../store';

export interface IAlbum {
  id: number;
  userId: number;
  title: string;
}

@Component({
  selector: 'app-page-two',
  template: `
    <div class="section">
      <h1>
        <span class="icon-bookmark"></span>
        Albums ({{ albumsCount$ | async }})
      </h1>
    </div>
    <div class="section">
      <ul>
        <li *ngFor="let album of albums$ | async">{{ album.title }}</li>
      </ul>
    </div>
  `,
  styles: [
  ]
})
export class PageTwoComponent implements OnInit {
  albums$: Observable<IAlbum[]>;
  albumsCount$: Observable<number>;

  constructor(private store: Store, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.albums$ = this.store.count$.pipe(
      switchMap(page => this.getAlbums(page)),
    );

    this.albumsCount$ = this.albums$.pipe(map(albums => albums.length));
  }

  private getAlbums(page: number): Observable<IAlbum[]> {
    const params = {
      _limit: '5',
      _page: page.toString(),
    };

    return this.httpClient.get<IAlbum[]>(
      'https://jsonplaceholder.typicode.com/albums',
      { params },
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAlbum } from '../models';

interface IFullAlbum extends IAlbum {
  url: string;
}

@Component({
  selector: 'app-selected-album',
  template: `
    <p *ngIf="album$ | async as album">
      <a target="_blank" [href]="album.url">{{ album.title }}</a>
    </p>
  `,
  styles: [
  ]
})
export class SelectedAlbumComponent implements OnInit {
  @Input() albumId: number;

  album$: Observable<IFullAlbum>;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    const url = 'http://jsonplaceholder.typicode.com/albums/' + this.albumId;
    this.album$ = this.httpClient.get<IAlbum>(url)
      .pipe(map(album => ({ ...album, url })))
  }
}

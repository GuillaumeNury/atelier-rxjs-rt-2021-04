import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IAlbum, IQuery } from "./models";

@Injectable({ providedIn: 'root' })
export class Store {
  albums$: Observable<IAlbum[]>;
  selectedAlbums$: Observable<IAlbum[]>;
  query$: Observable<IQuery>;

  _albums$: BehaviorSubject<IAlbum[]>;
  _selectedAlbumIds$: BehaviorSubject<number[]>;
  _query$: BehaviorSubject<IQuery>;

  constructor() {
    this._albums$ = new BehaviorSubject([]);
    this._selectedAlbumIds$ = new BehaviorSubject([]);
    this._query$ = new BehaviorSubject({ page: 1, search: '' });

    this.albums$ = this._albums$.asObservable();
    this.query$ = this._query$.asObservable();
    this.selectedAlbums$ = combineLatest([
      this.albums$,
      this._selectedAlbumIds$
    ]).pipe(
      map(
        ([albums, selectedAlbumIds]) => albums.filter(album => selectedAlbumIds.includes(album.id)).map(album => ({ ...album }))
      )
    );
  }

  public nextPage() {
    const current = this._query$.value;
    this._query$.next({ ...current, page: current.page + 1 });
  }

  public prevPage() {
    const current = this._query$.value;
    this._query$.next({ ...current, page: current.page - 1 });
  }

  public setSearch(search: string) {
    this._query$.next({ search, page: 1 });
  }

  public setAlbums(albums: IAlbum[]) {
    this._albums$.next(albums);
  }

  public toggleAlbum(album: IAlbum) {
    this._selectedAlbumIds$.next(
      this._selectedAlbumIds$.value.includes(album.id)
        ? this._selectedAlbumIds$.value.filter(id => id !== album.id)
        : [...this._selectedAlbumIds$.value, album.id]
    );
  }
}
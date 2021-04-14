import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '../store';

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-page-one',
  template: `
    <div class="section">
      <h1>
        <span class="icon-bookmark"></span>
        Users ({{ usersCount$ | async }})
      </h1>
    </div>
    <div class="section">
      <ul>
        <li *ngFor="let user of users$ | async">{{ user.name }} ({{ user.username }})</li>
      </ul>
    </div>
  `,
  styles: [
  ]
})
export class PageOneComponent implements OnInit {
  users$: Observable<IUser[]>;
  usersCount$: Observable<number>;

  constructor(private store: Store, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.users$ = this.store.count$.pipe(
      switchMap(page => this.getUsers(page)),
    );

    this.usersCount$ = this.users$.pipe(map(users => users.length));
  }

  private getUsers(page: number): Observable<IUser[]> {
    const params = {
      _limit: '5',
      _page: page.toString(),
    };

    return this.httpClient.get<IUser[]>(
      'https://jsonplaceholder.typicode.com/users',
      { params },
    );
  }
}

import { of, BehaviorSubject } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators/index.js';

const search$ = new BehaviorSubject('d');
const origin = Date.now();
const roundedNow = () => Math.floor((Date.now() - origin) / 100) * 100;

const httpClient = {
  get: (search) => of({ search }).pipe(delay(500)),
};

const users$ = search$.pipe(
  switchMap(search => httpClient.get(search)),
);

users$.subscribe(users => console.log(`Time: ${roundedNow()}\tResult: ${users.search}`));

setTimeout(() => search$.next('da'), 200);
setTimeout(() => search$.next('dan'), 400);
setTimeout(() => search$.next('dani'), 600);
setTimeout(() => search$.next('danie'), 800);
setTimeout(() => search$.next('daniel'), 1000);

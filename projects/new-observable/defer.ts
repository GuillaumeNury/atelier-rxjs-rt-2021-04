import { Observable } from "rxjs";

export function defer<T>(factory: () => Observable<T>): Observable<T> {
  return new Observable<T>(observer => {
    // TODO
  });
}
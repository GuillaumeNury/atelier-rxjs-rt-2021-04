import { Observable } from "rxjs";

export function of<T>(...values: T[]): Observable<T> {
  return new Observable<T>(observer => {
    // TODO
  });
}
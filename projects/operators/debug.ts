import { MonoTypeOperatorFunction, Observable } from "rxjs";

export function debug<T>(name: string): MonoTypeOperatorFunction<T> {
  // TODO
  return source$ => new Observable<T>();
}
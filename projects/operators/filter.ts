import { MonoTypeOperatorFunction, Observable } from "rxjs";

export function filter<T>(predicate: (val: T) => boolean): MonoTypeOperatorFunction<T> {
  // TODO
  return source$ => new Observable();
}
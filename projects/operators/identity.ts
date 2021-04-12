import { MonoTypeOperatorFunction, Observable } from "rxjs";

export function identity<T>(): MonoTypeOperatorFunction<T> {
  // TODO
  return source$ => new Observable();
}

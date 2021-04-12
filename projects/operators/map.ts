import { Observable, OperatorFunction } from "rxjs";

export function map<TIn, TOut>(projector: (val: TIn) => TOut): OperatorFunction<TIn, TOut> {
  // TODO
  return source$ => new Observable();
}
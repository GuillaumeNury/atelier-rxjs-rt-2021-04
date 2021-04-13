import { Observable } from "./observable";

export class Subject<T> extends Observable<T> {
  // TODO
  public constructor() {
    super();
  }
  
  // TODO
  public next(value: T): void { }
  
  // TODO
  public error(err: unknown): void { }
  
  // TODO
  public complete(): void { }
}

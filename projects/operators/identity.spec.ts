import { withTestScheduler } from "@lucca/jest-angular-testing";
import { identity } from "./identity";

describe('Operators > identity', () => {
  it('should mirror the input', withTestScheduler(({ expectObservable, cold }) => {
    // Arrange
    const values = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 };
    const source   = '0--1--2--3--4|';
    const expected = '0--1--2--3--4|';
  
    // Act
    const result$ = cold(source, values)
      .pipe(identity());
  
    // Assert
    expectObservable(result$).toBe(expected, values);
  }));
});
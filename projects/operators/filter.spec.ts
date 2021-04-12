import { withTestScheduler } from "@lucca/jest-angular-testing";
import { filter } from "./filter";

describe('Operators > filter', () => {
  it('should filter the input', withTestScheduler(({ expectObservable, cold }) => {
    // Arrange
    const values = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 };
    const source   = '0--1--2--3--4|';
    const expected = '0-----2-----4|';
  
    // Act
    const result$ = cold(source, values)
      .pipe(filter(n => n % 2 === 0));
  
    // Assert
    expectObservable(result$).toBe(expected, values);
  }));
});
import { withTestScheduler } from "@lucca/jest-angular-testing";
import { of } from "./of";

describe('of', () => {
  it('should emit values then complete', withTestScheduler(({ expectObservable }) => {
    // Arrange
    const marbleValues = { a: 1, b: 2, c: 3 };
    const expected = '(abc|)';
    
    // Act
    const result$ = of(1, 2, 3);
    
    // Assert
    expectObservable(result$).toBe(expected, marbleValues);
  }));

  it('should complete immediatly when called without values', withTestScheduler(({ expectObservable }) => {
    // Arrange
    const expected = '|';
    
    // Act
    const result$ = of();
    
    // Assert
    expectObservable(result$).toBe(expected);
  }));
});
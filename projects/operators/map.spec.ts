import { withTestScheduler } from "@lucca/jest-angular-testing";
import { map } from "./map";

describe('Operators > map', () => {
  it('should map the input', withTestScheduler(({ expectObservable, cold }) => {
    // Arrange
    const letters = 'abcdefg';
    const source   = 'a--b--c--d--e|';
    const expected = 'c--d--e--f--g|';
  
    // Act
    const result$ = cold(source)
      .pipe(map(letter => letters[letters.indexOf(letter) + 2]));
  
    // Assert
    expectObservable(result$).toBe(expected);
  }));
});
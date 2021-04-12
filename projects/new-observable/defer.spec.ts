import { withTestScheduler } from "@lucca/jest-angular-testing";
import { defer } from "./defer";

describe('Defer', () => {
  it('should call factory when there is a subscriber', withTestScheduler(({ hot, expectObservable }) => {
    // Arrange
    const subscribe = '------0';
    const source$ = hot('--a--b--c--|');
    const factory = jest.fn(() => source$);
    
    // Act
    const result$ = defer(factory);

    // Assert
    expect(factory).not.toBeCalled();
    expectObservable(result$).toBe('--a--b--c--|');
  }));
});
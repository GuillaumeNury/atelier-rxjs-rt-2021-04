import { of } from "rxjs";
import { take } from "rxjs/operators";
import { debug } from "./debug";

describe('Operators > debug', () => {
  let spy: jest.SpyInstance<void, any>;

  beforeEach(() => {
    spy = jest.spyOn(console, 'log');
    spy.mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should log when source complete', () => {
    // Act
    of(1, 2, 3, 4)
      .pipe(debug('test'))
      .subscribe();
  
    // Assert
    expect(spy).toHaveBeenCalledTimes(7);
    expect(spy).toHaveBeenNthCalledWith(1, 'test:subscribe');
    expect(spy).toHaveBeenNthCalledWith(2, 'test:next', 1);
    expect(spy).toHaveBeenNthCalledWith(3, 'test:next', 2);
    expect(spy).toHaveBeenNthCalledWith(4, 'test:next', 3);
    expect(spy).toHaveBeenNthCalledWith(5, 'test:next', 4);
    expect(spy).toHaveBeenNthCalledWith(6, 'test:complete');
    expect(spy).toHaveBeenNthCalledWith(7, 'test:unsubscribe');
  });

  it('should log when subscriber unsubscribe', () => {
    // Act
    of(1, 2, 3, 4)
      .pipe(debug('test'), take(2))
      .subscribe();
  
    // Assert
    expect(spy).toHaveBeenCalledTimes(4);
    expect(spy).toHaveBeenNthCalledWith(1, 'test:subscribe');
    expect(spy).toHaveBeenNthCalledWith(2, 'test:next', 1);
    expect(spy).toHaveBeenNthCalledWith(3, 'test:next', 2);
    expect(spy).toHaveBeenNthCalledWith(4, 'test:unsubscribe');
  });
});
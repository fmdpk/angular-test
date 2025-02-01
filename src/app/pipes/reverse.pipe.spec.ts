import { DatePipe } from '@angular/common';
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let pipe: ReversePipe;

  beforeEach(() => {
    pipe = new ReversePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should reverse a string', () => {
    expect(pipe.transform('hello')).toBe('olleh');
  });

  it('should handle empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  // it('should handle undefined input', () => {
  //   expect(pipe.transform(undefined)).toBeUndefined();
  // });

  describe('DatePipe', () => {
    it('should format a date', () => {
      const pipe = new DatePipe('en-US');
      expect(pipe.transform('2023-10-01', 'mediumDate')).toBe('Oct 1, 2023');
    });
  });
});

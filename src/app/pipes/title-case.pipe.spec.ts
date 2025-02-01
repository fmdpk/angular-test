import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {
  const pipe = new TitleCasePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });

  it('transforms "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toBe('Abc Def');
  });

  it('transforms "" to ""', () => {
    expect(pipe.transform('')).toBe('');
  });
});

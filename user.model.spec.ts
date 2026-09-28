import { User } from './user.model';

describe('User.getAge()', () => {
  const today = new Date(2024, 4, 20);

  it('TC-01: birthday has passed this year', () => {
    expect(new User('a@a.com','password1','A','B','0891234567','1990-01-01').getAge(today)).toBe(34);
  });

  it('TC-02: today is the birthday', () => {
    expect(new User('a@a.com','password1','A','B','0891234567','1990-05-20').getAge(today)).toBe(34);
  });

  it('TC-03: birthday has not yet arrived', () => {
    expect(new User('a@a.com','password1','A','B','0891234567','1990-12-31').getAge(today)).toBe(33);
  });

  it('TC-04: newborn born today', () => {
    expect(new User('a@a.com','password1','A','B','0891234567','2024-05-20').getAge(today)).toBe(0);
  });

  it('TC-05: leap year birthday', () => {
    expect(new User('a@a.com','password1','A','B','0891234567','2000-02-29').getAge(today)).toBe(24);
  });

  it('TC-06: future date', () => {
    expect(() => new User('a@a.com','password1','A','B','0891234567','2025-01-01').getAge(today)).toThrow();
  });

  it('TC-07: incorrect date format', () => {
    expect(() => new User('a@a.com','password1','A','B','0891234567','31/02/1990').getAge(today)).toThrow();
  });

  it('TC-08: null/undefined-like missing value', () => {
    expect(() => new User('a@a.com','password1','A','B','0891234567','').getAge(today)).toThrow();
  });

  it('TC-09: maximum lifespan example', () => {
    expect(new User('a@a.com','password1','A','B','0891234567','1900-01-01').getAge(today)).toBe(124);
  });

  it('TC-10: monthly boundary', () => {
    expect(new User('a@a.com','password1','A','B','0891234567','1990-05-21').getAge(today)).toBe(33);
  });
});

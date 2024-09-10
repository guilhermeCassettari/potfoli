import AppError from '../../errors/AppError';
import regexPassword from '../regexPassword';

describe('regexPassword', () => {
  it('should throw an error if the password does not meet the requirements', () => {
    const invalidPasswords = [
      'short',
      'nouppercase1!',
      'NOLOWERCASE1!',
      'NoSpecialChar123',
      'Valid1Password',
      '12345678',
      'ABCdefgh',
      'aB1!',
    ];

    invalidPasswords.forEach(password => {
      expect(() => regexPassword(password)).toThrow(AppError);
      expect(() => regexPassword(password)).toThrow(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
      );
    });
  });

  it('should not throw an error if the password meets all requirements', () => {
    const validPasswords = [
      'Valid1Password!',
      'A1b2C3d4$',
      'Another$Valid1Password',
      'P@ssw0rdWithMoreThan8Chars',
    ];

    validPasswords.forEach(password => {
      expect(() => regexPassword(password)).not.toThrow();
    });
  });
});

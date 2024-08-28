import AppError from '../../errors/AppError';
import regexPassword from '../regexPassword';

describe('regexPassword', () => {
  it('should throw an error if the password does not meet the requirements', () => {
    const invalidPasswords = [
      'short', // Too short
      'nouppercase1!', // No uppercase letter
      'NOLOWERCASE1!', // No lowercase letter
      'NoSpecialChar123', // No special character
      'Valid1Password', // Valid but without special character (assuming the regex is strict)
      '12345678', // Only numbers
      'ABCdefgh', // Uppercase and lowercase letters only
      'aB1!', // Too short
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

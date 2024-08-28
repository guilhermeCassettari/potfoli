import AppError from '../../../../shared/errors/AppError';
import phoneValidate from '../PhoneValidate';

describe('PhoneValidate', () => {
  it('should return a valid phone number whitout special characters and spaces', () => {
    const phone = '(14) 99675 - 8907 asdasdf';
    const result = phoneValidate(phone);
    expect(result).toEqual('14996758907');
  });

  it('Should be thrown an error if the phone number is short', () => {
    const phone = '123';
    expect(() => phoneValidate(phone)).toThrow(AppError);
  });

  it('Should be thrown an error if the phone number is long', () => {
    const phone = '123456789012';
    expect(() => phoneValidate(phone)).toThrow(AppError);
  });
});

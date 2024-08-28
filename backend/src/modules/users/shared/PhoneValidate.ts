import AppError from '../../../shared/errors/AppError';

export default function phoneValidate(phone: string): string {
  const regex = /\D/g;
  const regexPhone = phone.replace(regex, '');
  if (regexPhone.length < 10 || regexPhone.length > 11) {
    throw new AppError('Invalid phone number');
  }
  return `${regexPhone}`;
}

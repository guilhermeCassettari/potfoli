import AppError from '../errors/AppError';

export default function regexPassword(password: string) {
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,255}$/;

  if (!regexPassword.test(password)) {
    throw new AppError(
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
    );
  }
}

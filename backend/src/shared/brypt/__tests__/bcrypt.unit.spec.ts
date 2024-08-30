import * as bcrypt from 'bcrypt';
import { hashPassword, comparePassword } from '../bcrypt';

jest.mock('bcrypt');

describe('hashPassword', () => {
  it('should hash a password', async () => {
    const password = 'mySecretPassword123!';
    const hashedPassword = 'hashedPassword123';

    (bcrypt.hash as jest.Mock).mockImplementation(
      () => hashedPassword,
    );

    const result = await hashPassword(password);
    expect(result).toBe(hashedPassword);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
  });
});

describe('comparePassword', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return true if the password matches the hashed password', async () => {
    const password = 'mySecretPassword123!';
    const hashedPassword = 'hashedPassword123';

    (bcrypt.compare as jest.Mock).mockImplementation(() => true);

    const result = await comparePassword(password, hashedPassword);
    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      password,
      hashedPassword,
    );
  });

  it('should return false if the password does not match the hashed password', async () => {
    const password = 'wrongPassword';
    const hashedPassword = 'hashedPassword123';

    (bcrypt.compare as jest.Mock).mockImplementation(() => false);

    const result = await comparePassword(password, hashedPassword);
    expect(result).toBe(false);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      password,
      hashedPassword,
    );
  });
});

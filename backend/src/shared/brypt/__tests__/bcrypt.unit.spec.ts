import * as bcrypt from 'bcrypt';
import { hashPassword, comparePassword } from '../bcrypt';

jest.mock('bcrypt');
describe('Bcrypt', () => {
  const plainPassword = 'mySecretPassword123!';
  const hashedPassword = 'hashedPassword123';

  beforeEach(() => {
    (bcrypt.hashSync as jest.Mock).mockImplementation(
      () => hashedPassword,
    );

    (bcrypt.compareSync as jest.Mock).mockImplementation(
      (password, hash) => {
        return password === plainPassword && hash === hashedPassword;
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to hash a password', () => {
    const hashedPassword = hashPassword(plainPassword);
    expect(hashedPassword).toBe(hashedPassword);
    expect(bcrypt.hashSync).toHaveBeenCalledWith(plainPassword, 10);
  });

  it('should generate a hash that is not equal to the original password', () => {
    const result = hashPassword(plainPassword);
    expect(result).not.toBe(plainPassword);
  });

  it('should return true if the password matches the hashed password', () => {
    const result = comparePassword(plainPassword, hashedPassword);
    expect(result).toBe(true);
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      plainPassword,
      hashedPassword,
    );
  });

  it('should return false if the password does not match the hashed password', () => {
    const result = comparePassword('wrongPassword', hashedPassword);
    expect(result).toBe(false);
  });

  it('should return false if the hashed password does not match', () => {
    const result = comparePassword(
      plainPassword,
      'differentHashedPassword',
    );
    expect(result).toBe(false);
  });
});
